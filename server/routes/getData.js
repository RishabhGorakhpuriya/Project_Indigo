const express = require('express');
const FlightStatus = require('../models/flightStatus');
const moment = require('moment-timezone');
const router = express.Router();

router.get('/getData', async (req, res, next) => {
    try {
        // Extract filters from query parameters
        const filters = req.query;
        const query = {};
        console.log()
        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                if (['scheduled_departure'].includes(key)) {
                    const dateString = filters[key];
                    const date = new Date(dateString);

                    if (!isNaN(date.getTime())) {
                        // Convert to IST (Indian Standard Time) time zone
                        const localStartOfDay = moment.tz(date, 'Asia/Kolkata').startOf('day').utc().format(); // Start of day in UTC
                        const localEndOfDay = moment.tz(date, 'Asia/Kolkata').endOf('day').utc().format();   // End of day in UTC

                        // Construct query to match the entire day in UTC
                        query[key] = { $gte: moment.utc(localStartOfDay).add(6,"hours").format(), $lt: moment.utc(localEndOfDay).add(5, 'hours').format() };
                    }
                } else {
                    query[key] = filters[key];
                }
            }
        }

        // Log the final query
        console.log('Final Query:', query);

        // Find records based on the filters
        const flightStatuses = await FlightStatus.find(query).exec();

        // Send the filtered flight status records as the response
        res.json(flightStatuses);
    } catch (error) {
        // Handle errors during the fetch operation
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
