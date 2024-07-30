// const express = require('express');
// const { sendPushNotification } = require('../controller/notificationSender');
// const { sendSMS } = require('../controller/smsSender');
// const { sendEmail } = require('../controller/emailSender');
// // const { sendFlightStatusUpdate } = require('../controller/kakfaProducer'); // Corrected path
// const { sendMessage } = require('../controller/rabbitmqProducer');
// const Flight = require('../models/flightStatus');
// const Notification = require('../models/notification');

// const router = express.Router();

// // Middleware to parse JSON bodies for this router
// router.use(express.json()); // No need to use `bodyParser`, `express.json()` is sufficient

// // Endpoint to post flight status updates
// router.post('/flights/:flight_id', async (req, res) => {
//     const { flight_id } = req.params;
//     const { status } = req.body;
//     try {
//         const flight = await Flight.findOneAndUpdate(
//             { flight_id },
//             { status, last_updated: new Date() },
//             { new: true, upsert: true }
//         );

//         const notifications = await Notification.find({ flight_id });
//         notifications.forEach(async (notification) => {
//             switch (notification.method) {
//                 case 'Email':
//                     await sendEmail(notification.recipient, notification.message);
//                     break;
//                 case 'SMS':
//                     await sendSMS(notification.recipient, notification.message);
//                     break;
//                 case 'App':
//                     await sendPushNotification(notification.recipient, notification.message);
//                     break;
//             }
//         });

//         // sendFlightStatusUpdate(JSON.stringify({ flight_id, status }));
//         sendMessage(JSON.stringify({ flight_id, status }));

//         res.status(200).json(flight);
//     } catch (error) {
//         res.status(500).send('Error updating flight status');
//     }
// });

// // Endpoint to manage notifications
// router.post('/notifications', async (req, res) => {
//     const notifications = req.body; 
//     try {
//         await Notification.insertMany(notifications);
//         res.status(200).send('Notifications saved successfully');
//     } catch (error) {
//         res.status(500).send('Error saving notifications');
//     }
// });

// module.exports = router;
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
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

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