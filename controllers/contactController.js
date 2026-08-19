
const emailConfig = require("../config/emailConfig");

exports.sendContactEmail = async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
        return res.render("contact", {
            active: "contact",
            pageTitle: "Contact - SMK DIGITALS",
            error: "All fields are required",
        });
    }

    try {
        // Email sent to the business
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: process.env.RECIPIENT_EMAIL,
            replyTo: email,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Message from ${name}</h2>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>

                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
            `,
        };

        // Confirmation email sent to the person who submitted the form
        const confirmationEmail = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: "We received your message - SMK DIGITALS",
            html: `
                <h2>Hello ${name},</h2>

                <p>
                    Thank you for reaching out to SMK DIGITALS.
                    We have received your message and will get back to you shortly.
                </p>

                <p><strong>Your Message Summary:</strong></p>

                <p>
                    <strong>Subject:</strong> ${subject}
                </p>

                <p>
                    Our team will review your inquiry and respond within
                    24-48 hours.
                </p>

                <p>
                    Best regards,<br>
                    <strong>SMK DIGITALS Team</strong>
                </p>
            `,
        };

        // Send the business notification
        await emailConfig.sendMail(mailOptions);

        // Send confirmation to the customer
        await emailConfig.sendMail(confirmationEmail);

        // Show success page
        return res.render("contact-success", {
            active: "contact",
            pageTitle: "Message Sent - SMK DIGITALS",
            name: name,
        });

    } catch (error) {
        console.error("Email error:", error);

        // Show the contact form again with an error
        return res.render("contact", {
            active: "contact",
            pageTitle: "Contact - SMK DIGITALS",
            error: "Failed to send message. Please try again later.",
        });
    }
};

