import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';

export default function SearchDatePicker({label, setSearchDate}) {
  const [date,setDate] = useState(null);

  return(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        style={{width: "100px"}}
        label={label}
        value={date}
        inputFormat="yyyy-MM-dd"
        mask="____-__-__"
        onChange={(newValue) => {
          setDate(newValue);
          setSearchDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}