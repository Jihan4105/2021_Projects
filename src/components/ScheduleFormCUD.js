import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ScheduleType from "./ScheduleType";
import ScheduleStatus from "./ScheduleStatus";
import ToDoListDatePicker from './ToDoListDatePicker';
import ToDoListTimePicker from './ToDoListTimePicker';
import axios from 'axios';

export default function ScheduleFormCUD(props) {

    let selectedTime = (props.mode === "create") ? new Date() : new Date(props.rowdata.date + " " + props.rowdata.time);
    let disabled;
    let formTitle;

    if(props.mode === "create") {
        disabled = false;
        formTitle = "New Schedule";
    }
    else if(props.mode === "show"){
        disabled = true;
        formTitle = "View Schedule";
    }
    else if(props.mode === "update"){
        formTitle = "Edit Schedule";
    }

    const [inputs, setInputs] = useState({
        title: (props.mode === "create") ? "" : props.rowdata.title,
        contents: (props.mode === "create") ? "" : props.rowdata.contents,
        type: (props.mode === "create") ? "plan" : props.rowdata.type,
        status: (props.mode === "create") ? "notyet" : props.rowdata.status
    });

    const {title, contents, type, status} = inputs;

    const onChange = (e) => {
        const {name, value} = e.target;

        setInputs({
            ...inputs,
            [name] : value
        });
    }

    const changeTime = (newTime) => {
        selectedTime = newTime;
    }

    const createSchedule = () => {

        const fillZero = (num) => num<10 && num>=0 ? "0" + num : num;

        let date = props.selectedDate.getFullYear()+ "-" +
                    fillZero(props.selectedDate.getMonth()+1) + "-" +
                    fillZero(props.selectedDate.getDate());

        let time = fillZero(selectedTime.getHours())+":"+
                    fillZero(selectedTime.getMinutes());

        axios.post('http://localhost:3001/todolist/create', {
            date: date,
            time: time,
            title: title,
            contents: contents,
            type: type,
            status: status
        })
        .then((response) =>{
            props.setListOrForm("list");
            console.log("Created...");
        });
    }

    const updateSchedule = () => {
        const fillZero = (num) => num<10 && num>=0 ? "0" + num : num;

        let date = props.selectedDate.getFullYear()+ "-" +
                    fillZero(props.selectedDate.getMonth()+1) + "-" +
                    fillZero(props.selectedDate.getDate());

        let time = fillZero(selectedTime.getHours())+":"+
                    fillZero(selectedTime.getMinutes());

        axios.put('http://localhost:3001/todolist/update', {
            id: props.rowdata.id,
            date: date,
            time: time,
            title: title,
            contents: contents,
            type: type,
            status: status
        })
        .then((response) => {
            props.setListOrForm("list");
            console.log("Updated.....");
        })
        .catch((error) => {
            console.log(error);
        });

    }

    const deleteSchedule = () => {
        axios.delete('http://localhost:3001/todolist/delete', {
            params: {
                id: props.rowdata.id
            }
        })
        .then(response => {
            props.setListOrForm("list");
            console.log("deleted...");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const setList = () => {
        props.setListOrForm("list");
    }

    return (
        <div>
            <div>
                <div>
                    <h1>{formTitle}</h1>
                </div>
                <form>
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <ToDoListDatePicker selectedDate = {props.selectedDate} /> 
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ToDoListTimePicker selectedTime = {selectedTime} onChange = {changeTime} disabled = {disabled} />
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <TextField
                            label="Title"
                            name="title"
                            value={title}
                            variant="outlined"
                            style={{width: "100%", margin: "20px 0px 0px"}}
                            onChange={onChange}
                            disabled={disabled}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Contents"
                            name="contents"
                            variant="outlined"
                            multiline={true}
                            value={contents}
                            rows={10}
                            style={{width: "100%", margin: "20px 0px 0px"}}
                            onChange={onChange}
                            disabled={disabled}
                            spellCheck={false}
                        />
                    </div>
                    <div style={{margin: "20px 0px 0px"}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <ScheduleType type={type} onChange={onChange} disabled={disabled}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ScheduleStatus status={status} onChange={onChange} disabled={disabled}/>
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </div>
            <div style={{display: "flex", justifyContent: "center", margin: "30px 0px 30px"}}>
                <Button
                    style={(props.mode === "create" ) ? {marginRight: "20px"} : {display: "none"}}
                    variant="contained"
                    color="primary"
                    onClick={createSchedule}
                >
                    저장
                </Button>
                <Button
                    style={(props.mode === "show" ) ? {marginRight: "20px"} : {display: "none"}}
                    variant="contained"
                    color="primary"
                    onClick={props.setUpdateMode}
                >
                    수정
                </Button>
                <Button
                    style={(props.mode === "show" ) ? {marginRight: "20px"} : {display: "none"}}
                    variant="contained"
                    color="primary"
                    onClick={deleteSchedule}
                >
                    삭제
                </Button>
                <Button
                    style={(props.mode === "update" ) ? {marginRight: "20px"} : {display: "none"}}
                    variant="contained"
                    color="primary"
                    onClick={updateSchedule}
                >
                    저장
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={setList}
                >
                   취소
                </Button>
            </div>
        </div>
    );
}