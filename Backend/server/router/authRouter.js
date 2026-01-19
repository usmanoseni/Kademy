const express = require('express');
const student = require('../models/Student');
const tutor = require('../models/Tutor');
const hash_password = require('../middleware/utlis/hashPassword');
require('dotenv').config();
const router = express.Router();
const session = require('express-session');


// Login route for students 
router.post('/auth/student/login', async (req, res, next) => { 
    try {
        const { email, password, } = req.body; 
        const user = await student.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }
        const isMatch = await hash_password.checkPassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }
        req.session.userId = user._id; // Store user ID in session
        res.status(200).json({ msg: "Login successful", user });   
    } catch (err) {
        next(err);
    }
})

// Login route for tutors
router.post('/auth/tutor/login', async (req, res, next) => { 
    try {
        const { email, password } = req.body; 
        let user = await tutor.findOne({ email: email });
        const isMatch = await hash_password.checkPassword(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }
        req.session.userId = user._id; // Store user ID in session
        res.status(200).json({ msg: "Login successful", user });   
    } catch (err) {
        next(err);
    }
})

// Register route for students
router.post('/auth/student/register',  async (req, res, next) => {
    try { 
        const { Fname, email, password } = req.body;
        let user = await student.findOne({ email: email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const hashedPassword = await hash_password.hashpassword(password);
        newUser = new student({ Fname, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ msg: "Student registered successfully" });
    } catch (err) {
        next(err);
    }
})

// Register route for tutors
router.post('/auth/tutor/register', async (req, res, next) => {
    try { 
        const { Fname, email, password } = req.body;
        let user = await tutor.findOne({ email: email });   
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const hashedPassword = await hash_password.hashpassword(password);
        newUser = new tutor({ Fname, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ msg: "Tutor registered successfully" });
    } catch (err) {
        next(err);
    }
})

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
router.post('/auth/student/reset-passwrord', async (req, res, next) => { 
    try {
        const { email, otp } = req.body;
        const user = await student.findOne({ email: email });
        if (!user || user.resetOtp !== otp || user.otpExpired < new Date()) {
            return res.status(400).json({ msg: "Invalid or expired OTP" });
        } else {
            const hashedPassword = await hash_password.hashpassword(password);
            user.password = hashedPassword;
            await user.save();
            res.status(200).json({ msg: "Password updated successfully" });
        }
    } catch (err) {
        next(err);      
    }
})

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
        const { email, otp } = req.body;
        const user = await tutor.findOne({ email: email });
        if (!user || user.resetOtp !== otp || user.otpExpired < new Date()) {
            return res.status(400).json({ msg: "Invalid or expired OTP" });
        } else {
            const hashedPassword = await hash_password.hashpassword(password);
            user.password = hashedPassword;
            await user.save();
            res.status(200).json({ msg: "Password updated successfully" });
        }
    } catch (err) {
        next(err);      
    }
})



module.exports = router;