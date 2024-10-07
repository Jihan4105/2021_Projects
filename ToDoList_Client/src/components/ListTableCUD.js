import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

export default function ListTableCUD({selectedDate, showSchedule}) { // ... , listOrForm => "form", mode => "show", setRowdata(row)

    const[rows, setRows] = useState([]);

    useEffect(() => {
        
        const fillZero = (num) => num<10 && num>=0 ? "0" + num : num;

        let date = selectedDate.getFullYear() + "-" +
                    fillZero(selectedDate.getMonth() + 1) + "-" +
                    fillZero(selectedDate.getDate());

        axios.get('http://localhost:3001/todolist/search_date', {
            params: {
                date: date
            }
        })
        .then(response => {
            if(JSON.stringify(rows) !== JSON.stringify(response.data.rows)){
                setRows(response.data.rows);
            }
        });

    });

    const columns = [
        {id: 'date', label: 'DateTime', minwidth: 100, align: "center"},
        {id: 'title', label: 'Title', minwidth: 150, align: "left"},
        {id: 'type', label: 'Type', minWidth: 80, align: "center"},
        {id: 'status', label: 'Status', minWidth: 80, align: "center"},
    ];

    const handleClick = (event,row) => {
        showSchedule(row);
    }

    return (
        <TableContainer >
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell 
                                key={column.id}
                                style={{
                                    minWidth: column.minWidth,
                                    backgroundColor: "black",
                                    color: "white",
                                }}
                                align={column.align}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            hover={true}
                            key={row.id}
                            onClick={(event) => handleClick(event, row)}
                        >
                            <TableCell align="center" component="th" scope="row">{row.date} {row.time}</TableCell>
                            <TableCell align="left">{row.title}</TableCell>
                            <TableCell align="center">{row.type}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
