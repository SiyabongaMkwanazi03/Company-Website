const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP CONFIG ERROR:", error);
    } else {
        console.log("SMTP server is ready to send messages");
    }
});

module.exports = transporter;