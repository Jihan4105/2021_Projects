import React, {useState} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function ScheduleStatus({status, onChange, disabled}) {
  const [value, setValue] = useState(status);

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Schedule Status</FormLabel>
      <RadioGroup row aria-label="status" name="status" defaultValue="notyet" value = {value} onChange={handleChange}>
        <FormControlLabel
          value="notyet"
          control={<Radio color="primary" />}
          label="Not yet"
          disabled = {disabled}
        />
        <FormControlLabel
          value="done"
          control={<Radio color="primary" />}
          label="Done"
          disabled = {disabled}
        />
        <FormControlLabel
          value="canceled"
          control={<Radio color="primary" />}
          label="Canceled"
          disabled = {disabled}
        />
      </RadioGroup>
    </FormControl>
  );
}
