import React, {useState} from 'react';
import ListTableR from "./ListTableR";
import ScheduleFormR from "./ScheduleFormR";

function ListAndFormR({isListOrForm, totalPage, searchedRows, setCurrentPage, searchList}) {

  const [listOrForm, setListOrForm] = useState(isListOrForm);
  const [selectedRow, setSelectedRow] = useState([]);

  const showSelectedRow = (row) => {
    setSelectedRow(row);
    setListOrForm("form");
  }

  const showList = () => {
    setListOrForm("list");
  }

  if(listOrForm === "list"){
    return(
      <div>
        <div style={{display: "flex", alignItems: "center"}}>
          <h1>To Do List</h1>
        </div>
        <ListTableR
          totalPage = {totalPage}
          searchedRows = {searchedRows}
          showSelectedRow = {showSelectedRow}
          setCurrentPage = {setCurrentPage}
          searchList = {searchList}
        />
      </div>
    );
  }
  else if(listOrForm === "form") {
    return (
      <div>
        <ScheduleFormR
         selectedRow = {selectedRow}
         showList = {showList}
        />
      </div>
    );
  }
}

export default ListAndFormR