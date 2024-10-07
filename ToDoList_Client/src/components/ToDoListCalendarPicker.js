import React, {useState, useEffect} from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import CalendarPicker from '@material-ui/lab/CalendarPicker';

export default function ToDoListCalendarPicker({func}) { //setSelectedDate func

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        func(date);
    });

    return (
        <div>
            <h1>Calendar</h1>
            <div style = {{border: "1px solid lightgrey", padding: "2px"}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CalendarPicker
                        date={date}
                        onChange={(newDate) => setDate(newDate)}
                    />
                </LocalizationProvider>
            </div>
        </div>
    )
}