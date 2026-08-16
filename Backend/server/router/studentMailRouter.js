const express = require('express')
require('dotenv').config()
const Mail = require('../mail/mail');
const student = require('../models/Student');
const router = express.Router();
const { render } = require("@react-email/render");
const StudentOtpEmail = require('../mail/students/StudentOtpEmail');
const crypto = require('crypto');
const fetch = global.fetch || require('node-fetch');
const path = require("path");

const normalizeEmail = (value = '') => value.trim().toLowerCase();
const sendErrorResponse = (res, status, message) => res.status(status).json({ success: false, message });
const findUserByEmail = async (Model, email) => {
    const normalizedEmail = normalizeEmail(email);
    return Model.findOne({
        email: { $regex: `^${normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' }
    });
};

//post Otp and mail api for student 
router.post('/auth/student', async (req, res, next) => {
    try {
        const { email } = req.body;
        
        const user = await findUserByEmail(student, email);
        if (!user) {
            return res.status(400).json({ msg: "User with this email does not exist" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpTime = new Date(Date.now() + 3* 60 * 1000); // OTP valid for 5 minutes
        user.resetOtp = otp;
        user.otpExpired = otpTime;
        await user.save();
        const html = await render(StudentOtpEmail({ user: user.Fname, otp }));
        const mail = new Mail();
        mail.setTo(user.email);
        mail.setSubject('Your Kademy password-reset code');
        mail.setHtml(html);
        mail.setAttachments([
            {
                filename: "logo1.png",
                path: path.join(__dirname, "../mail/image/logo.png"),
                cid: "logo1",
            },
             {
                filename: "logo2.png",
                path: path.join(__dirname, "../mail/image/logo_dark.png"),
                cid: "logo2",
            }
        ]);
        await mail.send();
        return res.status(200).json({ success: true, msg: 'OTP sent successfully' });
    }
    catch (err) {
        next(err)
    }
        
});


module.exports = router;
