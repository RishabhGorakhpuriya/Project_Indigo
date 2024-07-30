const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tailothservice@gmail.com',
        pass: 'xzqdcenkqtfovjbv'
    }
});

const sendEmail = async (email, message) => {
    const mailOptions = {
        from: 'tailothservice@gmail.com',
        to: email,
        subject: 'Flight Status Update',
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to:', email);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
