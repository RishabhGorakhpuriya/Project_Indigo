const express = require('express');
const connectToMongo = require('./db');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const flightStatusRoutes = require('./routes/getData'); // Adjust the path as needed
const notificationRoutes = require('./routes/notification'); // Corrected variable name

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Use the flight status routes
app.use('/', flightStatusRoutes);

// Use the notification routes
app.use('/api/notification', require('./routes/notification'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at port number ${PORT}`);
});
