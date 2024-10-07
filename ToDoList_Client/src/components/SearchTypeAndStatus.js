import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function SearchTypeAndStatus({setValType, setValStatus}) {
  const [type, setType] = useState({
    plan: true,
    promise: true,
    duty: true,
  });

  const[status, setStatus] = useState({
    notyet: true,
    done: true,
    canceled: true,
  });

  const handleChangeType = (event) => {
    setType ({
      ...type,
      [event.target.name]: event.target.checked,
    });
    setValType({
      ...type,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeStatus = (event) => {
    setStatus({
      ...status,
      [event.target.name]: event.target.checked,
    });
    setValStatus({
      ...status,
      [event.target.name]: event.target.checked,
    });
  };

  const {plan,promise,duty} = type;
  const {notyet,done,canceled} = status;

  const typeError = [plan, promise, duty].filter((v) => v).length < 1;
  const statusError = [notyet, done, canceled].filter((v) => v).length < 1;

  return(
    <Box>
      <FormControl
        required
        error={typeError}
        sx={{ m: 3}}
        component="fieldset"
        variant="starndard"
      >
        <FormLabel component="legend">Type</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={plan} onChange={handleChangeType} name="plan" />
            }
            label="Plan"
          />
          <FormControlLabel
            control={
              <Checkbox checked={promise} onChange={handleChangeType} name="promise" />
            }
            label="Promise"
          />
          <FormControlLabel
            control={
              <Checkbox checked={duty} onChange={handleChangeType} name="duty" />
            }
            label="Duty"
          />
        </FormGroup>
        <FormHelperText>Select One or more</FormHelperText>
      </FormControl>
      <FormControl
        required
        error={statusError}
        component="fieldset"
        sx={{ m: 3}}
        variant="standard"
      >
        <FormLabel>Status</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={notyet} onChange={handleChangeStatus} name="notyet" />
            }
            label="Not yet"
          />
          <FormControlLabel
            control={
              <Checkbox checked={done} onChange={handleChangeStatus} name="done" />
            }
            label="Done"
          />
          <FormControlLabel
            control={
              <Checkbox checked={canceled} onChange={handleChangeStatus} name="canceled" />
            }
            label="Canceled"
          />
        </FormGroup>
        <FormHelperText>Select one or more</FormHelperText>
      </FormControl>
    </Box>
  );
}