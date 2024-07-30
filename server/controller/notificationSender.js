const admin = require('firebase-admin');
const serviceAccount = require('../../../indigo-fa42b-firebase-adminsdk-hxo9w-b1bfa30035.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const sendPushNotification = async (fcmToken, message) => {
    const notificationMessage = {
        token: fcmToken,
        notification: {
            title: 'Flight Status Update',
            body: message
        }
    };

    try {
        await admin.messaging().send(notificationMessage);
        console.log('Push notification sent to:', fcmToken);
    } catch (error) {
        console.error('Error sending push notification:', error);
    }
};

module.exports = sendPushNotification;
