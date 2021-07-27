import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import ToDoListCalendarPicker from "../components/ToDoListCalendarPicker";
import ListAndFormCUD from "../components/ListAndFormCUD";

function ScheduleCUD() {

    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={12} md={4}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <ToDoListCalendarPicker func = {setSelectedDate} />
                    </div>
                </Grid>
                <Grid item xs={12} md={8}>
                    <div style={{padding: '0px 20px 0px 20px'}}>
                        <ListAndFormCUD isListOrForm = "list" selectedDate = {selectedDate} />
                    </div>
                </Grid> 
            </Grid>
        </div>
    )
}

export default ScheduleCUD;