import React from 'react'
import { useGlobalContext } from '../Context/context';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
const Details = () => {
    const { results, sendNotification } = useGlobalContext();
    const handleSendNotification = async (flight_id) => {
        try {
            const response = await sendNotification(flight_id);
            alert(response); // Display the response message
        } catch (error) {
            console.error("Error sending notification:", error);
            alert("Error sending notification");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }) + ' ' +
            date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
    };
    return (
        <>
            <Box>
                {results && results.length > 0 ? (
                    results.map((flight, index) => (
                        <Card key={index} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <div className='d-flex justify-content-evenly my-3 gap-2'>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Flight Number: {flight.flight_id}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Airline: {flight.airline}
                                    </Typography>
                                </div>
                                <div className='d-flex justify-content-evenly my-3'>
                                    <Typography variant="h5" component="div">
                                        Time: {flight.status}
                                    </Typography>

                                    <Typography variant="h5" component="div">
                                        Arrival Gate: {flight.arrival_gate}
                                    </Typography>
                                </div>
                                <div className='d-flex justify-content-evenly my-3'>
                                    <Typography>
                                        Scheduled Departure: {formatDate(flight.scheduled_departure)}
                                    </Typography>
                                    <i class="fa-solid fa-arrow-right"></i>
                                    <Typography>
                                        scheduled Arrival : {formatDate(flight.scheduled_arrival)}
                                    </Typography>
                                </div>

                                <button onClick={() => handleSendNotification(flight._id)}>Send Notification</button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography>No flights available</Typography>
                )}
            </Box>
        </>
    )
}

export default Details
