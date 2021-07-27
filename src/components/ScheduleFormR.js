import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ScheduleType from './ScheduleType';
import ScheduleStatus from './ScheduleStatus';
import ToDoListDatePicker from './ToDoListDatePicker';
import ToDoListTimePicker from './ToDoListTimePicker';

export default function ScheduleFormR({selectedRow, showList}) {

  let selectedTime = new Date(selectedRow.date + " " + selectedRow.time);

  const changeTime = () => {

  }

  const onChange = () => {

  }

  return(
    <div>
      <div>
        <div>
          <h1>View Schedule</h1>
        </div>
        <form>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <ToDoListDatePicker selectedDate = {selectedRow.date} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ToDoListTimePicker selectedTime = {selectedTime} onChange = {changeTime} disabled = {true} />
              </Grid>
            </Grid>
          </div>
          <div>
            <TextField
              label="Title"
              name="title"
              value={selectedRow.title}
              variant="outlined"
              style={{width: "100%", margin: "20px 0px 0px"}}
              onChange = {onChange}
              disabled = {true}
            />
          </div>
          <div>
            <TextField
              label="Contents"
              name="contents"
              variant="outlined"
              multiline={true}
              value={selectedRow.contents}
              rows={10}
              style={{width: "100%", margin: "20px 0px 0px"}}
              onChange={onChange}
              disabled={true}
            />
          </div>
          <div style={{margin: "20px 0px 0px"}}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <ScheduleType type={selectedRow.type} onChange={onChange} disabled={true} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ScheduleStatus status={selectedRow.status} onChange={onChange} disabled={true} />
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
      <div style={{display: "flex", justifyContent: "center", margin: "30px 0px 30px"}}>
        <Button 
          variant="contained"
          color="primary"
          onClick={showList}
        >
          목록으로
        </Button>
      </div>
    </div>
  );
}
