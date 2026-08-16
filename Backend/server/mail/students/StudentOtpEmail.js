const React = require('react');
const path = require("path");
const {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Heading,
    Text,
    Hr,
    Link,
    Img
} = require('@react-email/components');

const logo1 = path.join(__dirname, "../mail/image/logo.png");
const logo2 = path.join(__dirname, "../mail/image/logo_dark.png");

const element = React.createElement;

const styles = {
    body: { backgroundColor: '#f1f5f9', fontFamily: 'Arial, sans-serif', padding: '32px 12px' },
    container: { backgroundColor: '#ffffff', borderRadius: '16px', margin: '0 auto', maxWidth: '600px', overflow: 'hidden' },
    header: {background: "linear-gradient(135deg, #2563eb 0%, #4338ca 100%)", color: '#ffffff', display:'flex', justifyContent:'center', alignItems: 'center',  gap:2, padding: '28px 40px' },
    content: { padding: '32px 34px' },
    otp: { backgroundColor: '#f8fafc', borderRadius: '12px', color: '#1f2937', fontSize: '32px', fontWeight: '700', letterSpacing: '8px', padding: '24px', textAlign: 'center' },
    footer: { backgroundColor: '#f8fafc', color: '#64748b', padding: '20px 40px', textAlign: 'center' },
    text: { color: '#4b5563', fontSize: '16px', lineHeight: '24px' }
};

function StudentOtpEmail({ user = 'Student', otp = '' }) {
    return element(
        Html,
        null,
        element(Head),
        element(Preview, null, `Your Kademy password-reset otp code is ${otp}`),
        element(
            Body,
            { style: styles.body },
            element(
                Container,
                { style: styles.container },
                element(
                    Section,
                    { style: styles.header },

                    element(Img, {
                        src: "cid:logo2",
                        width: 80,
                        height: 80,
                        alt: "Kademy Logo",
                        style: {
                            display: "block",
                            margin: "0 auto 15px auto"
                        }
                    }),
                     element(
                            Heading,
                            {
                                as: "h1",
                                style: {
                                    margin: 0,
                                    color: "#fff",
                                    fontSize: "22px"
                                }
                            },
                            "Kademy"
                        )),
                element(
                    Section,
                    { style: styles.content },
                    element(Heading, { as: 'h3', style: { color: '#4338ca', fontSize: '18px'} }, `Email verification OTP`),
                    element(Hr, { style: { borderColor: '#e5e7eb', margin: '28px 0' } }),
                    element(Heading, { as: 'h2', style: { color: '#1f2937', fontSize: '16px' } }, `Hello ${user},`),
                    element(Text, { style: styles.text }, 'Use the one-time password below to reset your Kademy password.'),
                    element(Section, { style: styles.otp }, otp),
                    element( Text,{ style: styles.text },"This code expires in ", element("strong",{style: { color: "#4338ca", fontWeight: "700",},},"3 minutes" ),"."),
                    element(Text, { style: styles.text }, `Do not share it with anyone. If you did not request a password reset, you can safely ignore this email.`),
                    element(Hr, { style: { borderColor: '#e5e7eb', margin: '28px 0' } }),
                    element(Text, { style: styles.text }, 'If you have any questions or need any help? ', element(Link, { href: 'mailto:contact@kademylearninghub.com' }, 'Contact Kademy support.')),
                    element(Text, { style: styles.text }, 'Your seurity is our top priority.'),
                    element(Text, { style: styles.text }, `Take care,`),
                    element(Text, { style: styles.text }, `The kademy Team.`),
                ),
               element(
                Section,
                {
                    style: styles.footer
                },

                element(Img, {
                    src: "cid:logo1",
                    width: 50,
                    height: 50,
                    alt: "Kademy",
                    style: {
                        display: "block",
                        margin: "0 auto 15px auto"
                    }
                }),

                element(
                    Text,
                    {
                        style: {
                            margin: 0,
                            textAlign: "center",
                            fontSize: "13px"
                        }
                    },
                    `© ${new Date().getFullYear()} Kademy E-learning Hub`
                )) )
                ));
}

module.exports = StudentOtpEmail;
