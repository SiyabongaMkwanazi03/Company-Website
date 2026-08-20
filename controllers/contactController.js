const nodemailer = require('nodemailer');

exports.sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject:"New contact form message from " + name,
      text: message,
    });

    res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
};
