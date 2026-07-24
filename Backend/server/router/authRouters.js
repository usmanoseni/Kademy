const express = require('express');
const crypto = require('crypto');
const fetch = global.fetch || require('node-fetch');
const student = require('../models/Student');
const tutor = require('../models/Tutor');
const hash_password = require('../middleware/utlis/hashPassword');
require('dotenv').config();
const router = express.Router();

const normalizeEmail = (value = '') => value.trim().toLowerCase();
const sendErrorResponse = (res, status, message) => res.status(status).json({ success: false, message });
const findUserByEmail = async (Model, email) => {
    const normalizedEmail = normalizeEmail(email);
    return Model.findOne({
        email: { $regex: `^${normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' }
    });
};

const buildFrontendRedirect = (req, path = '/student/dashboard') => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return `${frontendUrl}${path}`;
};

const buildProviderConfig = (provider) => {
    if (provider === 'google') {
        return {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/auth/student/google/callback',
            authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
            tokenUrl: 'https://oauth2.googleapis.com/token',
            userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo'
        };
    }

    if (provider === 'facebook') {
        return {
            clientId: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            redirectUri: process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:5000/api/auth/student/facebook/callback',
            authorizeUrl: 'https://www.facebook.com/dialog/oauth',
            tokenUrl: 'https://graph.facebook.com/v20.0/oauth/access_token',
            userInfoUrl: 'https://graph.facebook.com/me'
        };
    }

    throw new Error('Unsupported provider');
};

const ensureProviderConfig = (provider) => {
    const config = buildProviderConfig(provider);
    if (!config.clientId || !config.clientSecret) {
        throw new Error(`${provider === 'google' ? 'Google' : 'Facebook'} OAuth is not configured yet. Please contact the administrator.`);
    }
    return config;
};

const buildAuthorizeUrl = (provider, req) => {
    const config = ensureProviderConfig(provider);
    const scopes = provider === 'google' ? 'openid email profile' : 'email public_profile';
    const params = new URLSearchParams({
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        response_type: 'code',
        scope: scopes,
        state: crypto.randomBytes(16).toString('hex')
    });

    if (provider === 'facebook') {
        params.set('auth_type', 'rerequest');
    }

    return `${config.authorizeUrl}?${params.toString()}`;
};

const exchangeCodeForToken = async (provider, code, redirectUri) => {
    const config = ensureProviderConfig(provider);
    const body = new URLSearchParams({
        code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
    });

    const response = await fetch(config.tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`${provider} token exchange failed: ${errorBody}`);
    }

    return response.json();
};

const getOAuthProfile = async (provider, accessToken) => {
    const config = ensureProviderConfig(provider);
    const url = provider === 'google'
        ? `${config.userInfoUrl}?access_token=${encodeURIComponent(accessToken)}`
        : `${config.userInfoUrl}?fields=id,name,email,picture&access_token=${encodeURIComponent(accessToken)}`;

    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) {
        throw new Error(`${provider} profile fetch failed`);
    }

    return response.json();
};

const createSocialStudent = async (profile, provider) => {
    const email = profile.email || `${provider}-${profile.id}@kademy.local`;
    const normalizedEmail = normalizeEmail(email);
    let existingUser = await findUserByEmail(student, normalizedEmail);

    if (existingUser) {
        return existingUser;
    }

    const tempPassword = crypto.randomBytes(24).toString('hex');
    const hashedPassword = await hash_password.hashpassword(tempPassword);
    const newUser = await student.create({
        Fname: profile.name || `${provider} User`,
        email: normalizedEmail,
        password: hashedPassword,
        completeRegistration: false
    });

    return newUser;
};

// Login route for students 
router.post('/auth/student/login', async (req, res, next) => { 
    try {
        const { email, password } = req.body; 
        if (!email || !password) {
            return sendErrorResponse(res, 400, 'Please enter both your email and password.');
        }

        const user = await findUserByEmail(student, email);
        if (!user) {
            return sendErrorResponse(res, 401, 'We could not find an account with that email. Please check your email or sign up.');
        }
        const isMatch = await hash_password.checkPassword(password, user.password);
        if (!isMatch) {
            return sendErrorResponse(res, 401, 'The password you entered is incorrect. Please try again.');
        }
        req.session.userId = user._id;
        return res.status(200).json({ success: true, message: 'Login successful', user });   
    } catch (err) {
        next(err);
    }
});

router.post('/auth/student/google', async (req, res, next) => {
    try {
        const authUrl = buildAuthorizeUrl('google', req);
        res.status(200).json({ success: true, authUrl, message: 'Redirecting to Google OAuth' });
    } catch (err) {
        return sendErrorResponse(res, 500, err.message || 'Google sign-in could not be started right now.');
    }
});

router.get('/auth/student/google/callback', async (req, res, next) => {
    try {
        const { code } = req.query;
        if (!code) {
            return sendErrorResponse(res, 400, 'The Google sign-in request was incomplete. Please try again.');
        }

        const tokenData = await exchangeCodeForToken('google', code, process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/auth/student/google/callback');
        const profile = await getOAuthProfile('google', tokenData.access_token);
        const user = await createSocialStudent(profile, 'google');

        req.session.userId = user._id;
        req.session.userType = 'student';
        req.session.provider = 'google';

        return res.redirect(buildFrontendRedirect(req, '/student/dashboard?auth=success'));
    } catch (err) {
        return res.redirect(`${buildFrontendRedirect(req, '/auth/student/login')}?error=${encodeURIComponent(err.message || 'Google sign-in failed. Please try again.')}`);
    }
});

router.post('/auth/student/facebook', async (req, res, next) => {
    try {
        const authUrl = buildAuthorizeUrl('facebook', req);
        res.status(200).json({ success: true, authUrl, message: 'Redirecting to Facebook OAuth' });
    } catch (err) {
        return sendErrorResponse(res, 500, err.message || 'Facebook sign-in could not be started right now.');
    }
});

router.get('/auth/student/facebook/callback', async (req, res, next) => {
    try {
        const { code } = req.query;
        if (!code) {
            return sendErrorResponse(res, 400, 'The Facebook sign-in request was incomplete. Please try again.');
        }

        const tokenData = await exchangeCodeForToken('facebook', code, process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:5000/api/auth/student/facebook/callback');
        const profile = await getOAuthProfile('facebook', tokenData.access_token);
        const user = await createSocialStudent(profile, 'facebook');

        req.session.userId = user._id;
        req.session.userType = 'student';
        req.session.provider = 'facebook';

        return res.redirect(buildFrontendRedirect(req, '/student/dashboard?auth=success'));
    } catch (err) {
        return res.redirect(`${buildFrontendRedirect(req, '/auth/student/login')}?error=${encodeURIComponent(err.message || 'Facebook sign-in failed. Please try again.')}`);
    }
});

// Login route for tutors
router.post('/auth/tutor/login', async (req, res, next) => { 
    try {
        const { email, password } = req.body; 
        const user = await findUserByEmail(tutor, email);
        if (!user) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }
        const isMatch = await hash_password.checkPassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }
        req.session.userId = user._id; // Store user ID in session
        req.session.userType = 'tutor';
        res.status(200).json({ msg: "Login successful", user, userType: 'tutor' });   
    } catch (err) {
        next(err);
    }
});

// Register route for students
router.post('/auth/student/register',  async (req, res, next) => {
    try { 
        const { Fname, email, password } = req.body;
        if (!Fname || !email || !password) {
            return sendErrorResponse(res, 400, 'Please provide your name, email, and password.');
        }
        const normalizedEmail = normalizeEmail(email);
        let user = await findUserByEmail(student, normalizedEmail);
        if (user) {
            return sendErrorResponse(res, 409, 'An account with this email already exists. Please sign in instead.');
        }
        const hashedPassword = await hash_password.hashpassword(password);
        const newUser = new student({ Fname, email: normalizedEmail, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ success: true, message: 'Student registered successfully' });
    } catch (err) {
        next(err);
    }
});

// Register route for tutors
router.post('/auth/tutor/register', async (req, res, next) => {
    try { 
        const { Fname, email, password } = req.body;
        if (!Fname || !email || !password) {
            return sendErrorResponse(res, 400, 'Please provide your name, email, and password.');
        }
        const normalizedEmail = normalizeEmail(email);
        let user = await findUserByEmail(tutor, normalizedEmail);   
        if (user) {
            return sendErrorResponse(res, 409, 'An account with this email already exists. Please sign in instead.');
        }
        const hashedPassword = await hash_password.hashpassword(password);
        const newUser = new tutor({ Fname, email: normalizedEmail, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ success: true, message: 'Tutor registered successfully' });
    } catch (err) {
        next(err);
    }
});

//post Otp api for student 
router.post('/auth/student', async (req, res, next) => {
    try {
        const { email } = req.body;
        
        const user = await student.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "User with this email does not exist" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpTime = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
        user.resetOtp = otp;
        user.otpExpired = otpTime;
        await user.save();
        res.status(200).json({ msg: "OTP sent successfully", otp }); // In real application, send OTP via email
    }
    catch (err) {
        next(err)
    }
        
});

//get Otp api for student
router.post('/auth/student/reset-password', async (req, res, next) => { 
    try {
        const { email, otp, password } = req.body;
        const user = await student.findOne({ email: email });
        if (!user || user.resetOtp !== otp || user.otpExpired < new Date()) {
            return res.status(400).json({ msg: "Invalid or expired OTP" });
        }
        const hashedPassword = await hash_password.hashpassword(password);
        user.password = hashedPassword;
        user.resetOtp = null;
        user.otpExpired = null;
        await user.save();
        res.status(200).json({ msg: "Password updated successfully" });
    } catch (err) {
        next(err);      
    }
});

//post Otp api for tutor
router.post('/auth/tutor', async (req, res, next) => {
    try {
        const { email } = req.body;
        
        const user = await tutor.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "User with this email does not exist" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpTime = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
        user.resetOtp = otp;
        user.otpExpired = otpTime;
        await user.save();
        res.status(200).json({ msg: "OTP sent successfully", otp }); // In real application, send OTP via email
    }
    catch (err) {
        next(err)
    }
        
});

//get Otp api for tutor
router.post('/auth/tutor/reset-password', async (req, res, next) => { 
    try {
        const { email, otp, password } = req.body;
        const user = await tutor.findOne({ email: email });
        if (!user || user.resetOtp !== otp || user.otpExpired < new Date()) {
            return res.status(400).json({ msg: "Invalid or expired OTP" });
        }
        const hashedPassword = await hash_password.hashpassword(password);
        user.password = hashedPassword;
        user.resetOtp = null;
        user.otpExpired = null;
        await user.save();
        res.status(200).json({ msg: "Password updated successfully" });
    } catch (err) {
        next(err);      
    }
});

// Logout route for students
router.post('/auth/student/logout', (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ msg: "Error logging out" });
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ msg: "Logged out successfully" });
        });
    } catch (err) {
        next(err);
    }
});

// Logout route for tutors
router.post('/auth/tutor/logout', (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ msg: "Error logging out" });
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ msg: "Logged out successfully" });
        });
    } catch (err) {
        next(err);
    }
});

// Verify session route
router.get('/auth/verify', (req, res, next) => {
    try {
        if (req.session.userId) {
            res.status(200).json({ 
                msg: "User is authenticated",
                userId: req.session.userId 
            });
        } else {
            res.status(401).json({ msg: "User is not authenticated" });
        }
    } catch (err) {
        next(err);
    }
});

//verify student email
// router.post('/auth/student/verify-email', async (req, res, next) => {
//     try {
//         const { email } = req.body;

//         if (!email) {
//             return res.status(400).json({message: "Email is required.",});
//         }

//         const student = await Student.findOne({email: email.trim(), });

//         if (!student) {
//             return res.status(404).json({message: "No account found with this email.",});
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Email found.",
//             student: { email: student.email }
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal Server Error." })
//     }})
router.post('/auth/student/verify-email', async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body.email);

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const user = await student.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No account found with this email.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Email found.',
      student: { email: user.email }
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;