// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useGlobalContext } from "../Context/context";
// const DateSelector = () => {
//     const {scheduled_departure, setScheduled_departure} = useGlobalContext();
//     // const [startDate, setStartDate] = useState(new Date());

//     return (

//         <DatePicker dateFormat="yyyy/MM/dd" selected={scheduled_departure} onChange={(scheduled_departure) => setScheduled_departure(scheduled_departure)}/>

//     )
// }

// export default DateSelector

import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../Context/context";

const DateSelector = () => {
    const { scheduled_departure, setScheduled_departure } = useGlobalContext();

    // Check if scheduled_departure is a valid Date or null
    const isValidDate = (date) => date instanceof Date && !isNaN(date);

    useEffect(()=>{
        console.log(scheduled_departure, scheduled_departure.toLocaleDateString())
    })

    return (
        <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={isValidDate(scheduled_departure) ? scheduled_departure : null}
            onChange={(date) => setScheduled_departure(date)}
            placeholderText="Select a date"
        />
    );
};

export default DateSelector;
