import React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';

export default function ToDoListDatePicker({selectedDate}) {

    return (
        <LocalizationProvider dateAdapter = {AdapterDateFns}>
            <DatePicker
                label="Date"
                disabled={true}
                value={selectedDate}
                inputFormat="yyyy-MM-dd"
                mask="____-__-__"
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
