import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/core/Pagination';

export default function ListTableR({totalPage, searchedRows, showSelectedRow, setCurrentPage, searchList}) {

  const columns = [
    { id: 'date', label: 'DateTime', minWidth: 100, align: "center" },
    { id: 'title', label: 'Title',  minWidth: 150 ,align: "left"},
    { id: 'type', label: 'Type', minWidth: 80 , align: "center"},
    { id: 'status', label: 'Status', minWidth: 80, align: "center"},
  ];

  const handleClick = (event, row) => {
    showSelectedRow(row);
  }

	const renderResult = searchedRows ? searchedRows.map((row) => (
		<TableRow 
			hover = {true} 
			key={row.id}
			onClick={(event) => handleClick(event, row)}
		>
			<TableCell align="center" component="th" scope="row">
				{row.date} {row.time}
			</TableCell>
			<TableCell align="left">{row.title}</TableCell>
			<TableCell align="center">{row.type}</TableCell>
			<TableCell align="center">{row.status}</TableCell>
		</TableRow>
	)) : <div style={{marginTop: "30px", textAlign: "center"}}>검색된 결과가 없습니다</div>;

	const handlerPagenationBtn = (e, page) => {
		setCurrentPage(page);
	}

  return (
		<div>
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
          align = {column.align}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
    </TableHead>
    <TableBody>
      {renderResult}
    </TableBody>
    </Table>
    </TableContainer>
		<div style = {{display: "flex", justifyContent: "center"}}>
		<Pagination 
			style = {{margin: "30px 0px 30px 0px"}} 
			count={totalPage} 
			variant="outlined" 
			shape="rounded" 
			onChange = {handlerPagenationBtn}
		/>
		</div>
		</div>
  );
}