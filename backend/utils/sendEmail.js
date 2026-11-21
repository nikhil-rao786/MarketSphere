
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendEmail = async ({ email, subject, message }) => {
  try {
    const info = await transporter.sendMail({
      from: `"ShopNest Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: subject,
      html: message,
    });

    console.log(`Email successfully sent to ${email}`);
    console.log('Message ID:', info.messageId);

    return info;
  } catch (error) {
    console.error('Email sending failed:', error.message);
    throw error;
  }
};

module.exports = sendEmail;
