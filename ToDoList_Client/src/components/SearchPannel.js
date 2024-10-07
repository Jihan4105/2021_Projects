import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchDatePicker from "./SearchDatePicker";
import SearchTypeAndStatus from "./SearchTypeAndStatus";

export default function SearchPannel({setSearchedRows, setFromDate, setToDate, keyword, setKeyword, setValType, setValStatus, searchList}) {

  const handleChange = (event) => {
    setKeyword(event.taret.value);
  };

  return(
    <div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <h1>Search Condition</h1>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <SearchDatePicker label={"From"} setSearchDate = {setFromDate} />
      </div>
      <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
        <SearchDatePicker label={"To"} setSearchDate = {setToDate} />
      </div>
      <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
        <TextField
          style={{width: "270px"}}
          label="Keyword"
          value={keyword}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <SearchTypeAndStatus setValType={setValType} setValStatus={setValStatus} />
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button
          variant="contained"
          volor="primary"
          onClick={searchList}
        >
          검색
        </Button>
      </div>
    </div>
  );
}