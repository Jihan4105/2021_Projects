import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';

export default function ToDoListTimePicker({selectedTime, onChange, disabled}) { // onChnage => selectedTime = newValue;
    const [value, setValue] = useState(selectedTime);

    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                label="Time"
                renderInput={(params) => <TextField {...params} />}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue)
                    onChange(newValue);
                }}
                disabled={disabled}
            />
        </LocalizationProvider>
    );
}