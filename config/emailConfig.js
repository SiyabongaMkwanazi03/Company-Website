const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

console.log("SMTP HOST: smtpout.secureserver.net");
console.log("SMTP USER:", process.env.SMTP_EMAIL);

transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP CONFIG ERROR:", error);
    } else {
        console.log("SMTP server is ready to send messages");
    }
});

module.exports = transporter;