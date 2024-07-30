const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any email service provider
    auth: {
        user: process.env.EMAIL_COM,
        pass: process.env.EMAIL_PASS  // Your password
    }
});

// Configure Twilio
const twilioClient = twilio('', '');

router.post('/send', async (req, res) => {
    const { flight_id } = req.body;
    try {
        const notification = await Notification.findOne({"flight_id" : flight_id});
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        // Sending logic (Email or SMS)
        console.log(flight_id, req.body)
        if (notification.method === 'Email') {
            const mailOptions = {
                from: process.env.EMAIL_COM,
                to: notification.recipient,
                subject: 'Flight Notification',
                text: notification.message
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                    return res.status(500).json({ message: "Error sending email" });
                } else {
                    res.json({ message: "Email sent successfully" });
                }
            });
        } else if (notification.method === 'SMS') {
            twilioClient.messages.create({
                body: notification.message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: notification.recipient
            })
            .then(message => res.json({ message: "SMS sent successfully" }))
            .catch(error => {
                console.log(error)
                res.status(500).json({ message: "Error sending SMS" })
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error sending notification" });
    }
});

module.exports = router;