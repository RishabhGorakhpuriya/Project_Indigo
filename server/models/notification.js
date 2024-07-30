const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    notification_id: String,
    flight_id: String,
    message: String,
    timestamp: String,
    method: String,
    recipient: String,
});

module.exports = mongoose.model('Notification', NotificationSchema);
