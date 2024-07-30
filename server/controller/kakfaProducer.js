const kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(client);

producer.on('ready', () => {
    console.log('Kafka Producer is ready');
});

const sendFlightStatusUpdate = (message) => {
    producer.send([{ topic: 'flight-status', messages: [message] }], (err, data) => {
        if (err) {
            console.error('Error sending message to Kafka:', err);
        } else {
            console.log('Message sent to Kafka:', data);
        }
    });
};

module.exports = sendFlightStatusUpdate;
