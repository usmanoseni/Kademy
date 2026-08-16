const nodemailer = require('nodemailer')
const path = require("path");

//create transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})
 

class Mail {
    constructor() {
        this.mailOptions = {
            from: {
                address: process.env.EMAIL,
                name: "Kademy E-learning Hub"
            }
        }
    }
    /**
     *  @param { String } name
     */
    
    setPlatformName(name) {
        this.mailOptions.from.name = name
    }

    /**
    *  @param { String } receiver_mail
    */

    setTo(receiverMail) {
        this.mailOptions.to = receiverMail;
    }

    setAttachments(attachment) {
        const attachments = this.mailOptions.attachments || [];
        attachments.push(attachment);
        this.mailOptions.attachments = attachments;

    }

    /**
    *  @param { String } subject
    */

    setSubject(subject) {
        this.mailOptions.subject = subject;
    }
    /**
    *  @param { String } text
    */

    setText(text) {
        this.mailOptions.text = text;
    }

    /**
    *  @param { String } html
    */

    setHtml(html) {
        this.mailOptions.html = html;
    }

    /**
     *  @return { void} 
    */

    async send() {
        if (!process.env.EMAIL || !process.env.PASSWORD) {
            throw new Error('Email service is not configured. Set EMAIL and PASSWORD in Backend/.env.');
        }

        return transporter.sendMail(this.mailOptions);
    }
}


module.exports=Mail

