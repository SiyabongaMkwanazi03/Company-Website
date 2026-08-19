const emailConfig = require("../config/emailConfig");

exports.sendContactEmail = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.render("contact", {
            active: "contact",
            pageTitle: "Contact - SMK DIGITALS",
            error: "All fields are required"
        });
    }

    try {
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: process.env.RECIPIENT_EMAIL,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Message from ${name}</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
            `,
        };

        const confirmationEmail = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: "We received your message - SMK DIGITALS",
            html: `
                <h2>Hello ${name},</h2>
                <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
                <p><strong>Your Message Summary:</strong></p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p>Our team will review your inquiry and respond within 24-48 hours.</p>
                <p>Best regards,<br>SMK DIGITALS Team</p>
            `,
        };

        await emailConfig.sendMail(mailOptions);
        await emailConfig.sendMail(confirmationEmail);

        res.render("contact-success", {
            active: "contact",
            pageTitle: "Message Sent - SMK DIGITALS",
            name: name,
        });

    } catch (error) {
        console.error("Email error:", error);

        res.render("contact", {
            active: "contact",
            pageTitle: "Contact - SMK DIGITALS",
            error: "Failed to send message. Please try again later.",
        });
    }
};