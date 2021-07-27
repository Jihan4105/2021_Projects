import React, {useState} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function ScheduleType({type, onChange, disabled}) {
    const [value, setValue] = useState(type);

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Schedule Type</FormLabel>
            <RadioGroup row aria-label="type" name="type" defaultValue="plan" value={value} onChange={handleChange}>
                <FormControlLabel   
                    value="plan"
                    control={<Radio color="primary" />}
                    label="Plan"
                    disabled={disabled}
                />
                <FormControlLabel
                    value="promise"
                    control={<Radio color="primary" />}
                    label="Promise"
                    disabled={disabled}
                />
                <FormControlLabel
                    value="duty"
                    control={<Radio color="primary" />}
                    label="Duty"
                    disabled={disabled}
                />
            </RadioGroup>
        </FormControl>
    );
}
