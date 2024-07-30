const twilio = require('twilio');
const client = new twilio('AC0f5676fa6b70437ba6a3937714fd1a46', '3dacb9a03bc94f3bd7c13544a2bce238');

const sendSMS = async (phone, message) => {
    try {
        await client.messages.create({
            body: message,
            from: 9479792505,
            to: phone
        });
        console.log('SMS sent to:', phone);
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
};

module.exports = sendSMS;
