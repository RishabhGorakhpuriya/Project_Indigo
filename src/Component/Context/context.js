import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = React.createContext();

const AppProvider = ({ children }) => { // Accept children prop
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("On Time");
  const [scheduled_departure, setScheduled_departure] = useState(new Date(""));
  const formatDateFn = (date) => {
    const selectedDate = new Date(date)
    return selectedDate.getFullYear() + "-" + parseInt(selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();

  }

  const handleSubmit = async ({ e, date }) => {
    try {
      const response = await axios.get(``, {
        params: { status, scheduled_departure: scheduled_departure.toLocaleDateString() }
      });
      setResults(response.data); // Set results with the fetched data
    } catch (error) {
      console.error('Error fetching flights data:', error);
    }
  };

  const sendNotification = async (flight_id) => {
    try {
      const response = await axios.post('', { flight_id });
      return response.data.message;
    } catch (error) {
      console.error("Error sending notification:", error.response ? error.response.data : error.message);
      throw new Error("Error sending notification");
    }
  };

  return (
    <AppContext.Provider value={{ results, setResults, status, setStatus, handleSubmit, scheduled_departure, setScheduled_departure, sendNotification }}>
      {children} {/* Render children components */}
    </AppContext.Provider>
  );
}

const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within an AppProvider');
  }
  return context;
}

export { AppContext, useGlobalContext, AppProvider };
