import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import SearchPannel from "../components/SearchPannel";
import ListAndFormR from "../components/ListAndFormR";
import axios from 'axios';

function ScheduleR() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [serachedRows, setSearchedRows] = useState([]);

    useEffect (() =>{
        searchList();
    }, [currentPage]);

    let [fromDate, setFromDate] = useState(new Date('1900-01-01'));
    let [toDate, setToDate] = useState(new Date('2099-12-31'));

    const [keyword, setKeyword] = useState('');

    const [valType, setValType] = useState({
        plan: true,
        promise: true,
        duty: true
    });

    const [valStatus, setValStatus] = useState({
        notyet: true,
        done: true,
        canceled: true
    })

    const searchList = () => {

        if(fromDate === null || isNaN(Date.parse(fromDate))) {
            fromDate = new Date('1900-01-01');
        }
        if(toDate === null || isNaN(Date.parse(toDate))) {
            toDate = new Date('2099-12-31');
        }

        if(isNaN(Date.parse(fromDate)) || isNaN(Date.parse(toDate))) {
            alert("잘못된 날짜 형식입니다.");
            return;
        }

        if(valType.plan === false && valType.promise === false && valType.duty === false) {
            alert("Type은 하나 이상 선택되어야 합니다.");
            return;
        }

        if(valStatus.notyet === false && valStatus.done === false && valStatus.canceled === false){
            alert('Status는 하나 이상 선택되어야 합니다.')
            return;
        }

        const fillZero = (num) => num<10 && num>=0 ? "0" + num : num;

        if(fromDate !== null){
            fromDate = fromDate.getFullYear() + "-" +
                        fillZero(fromDate.getMonth() +1 ) + "-" +
                        fillZero(fromDate.getDate());
        }
        else{
            fromDate = "1900-01-01";
        }

        if(toDate !== null){
            toDate = toDate.getFullYear() + "-" +
                        fillZero(toDate.getMonth() + 1 ) + "-" +
                        fillZero(toDate.getDate());
        }
        else{
            toDate = '2099-12-31';
        }

        let offset =(currentPage - 1 ) * 10;

        axios.get('http://localhost:3001/todolist/search_all', {
            params: {
                mode: "total",
                offset: offset,
                fromDate: fromDate,
                toDate: toDate,
                keyword: keyword,
                valType: valType,
                valStatus: valStatus
            }
        })
        .then((response) => {

            let pageCount = parseInt(response.data.rows[0].count / 10);
            if((response.data.rows[0].count % 10) > 0) {
                pageCount++;
            }
            setTotalPage(pageCount);

            axios.get('http://localhost:3001/todolist/search_all', {
                params: {
                    mode: "page",
                    offset: offset,
                    fromDate: fromDate,
                    toDate: toDate,
                    keyword: keyword,
                    valType: valType,
                    valStatus: valStatus
                }
            })
            .then((response) => {
                setSearchedRows(response.data.rows);
            });
        })
        .catch((error) => {
            setSearchedRows([]);
            console.log(error);
        });
    }

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={12} md={4}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <SearchPannel
                            setSearchedRows = {setSearchedRows}
                            setFromDate = {setFromDate}
                            setToDate = {setToDate}
                            keyword = {keyword}
                            setKeyword = {setKeyword}
                            setValType = {setValType}
                            setValStatus = {setValStatus}
                            searchList = {searchList}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={8}>
                    <div style={{padding: '0px 20px 0px 20px'}}>
                        <ListAndFormR
                            isListOrForm = "list"
                            setCurrentPage = {setCurrentPage}
                            totalPage = {totalPage}
                            setTotalPage = {setTotalPage}
                            searchedRows = {serachedRows}
                            searchList ={searchList}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ScheduleR;