const { query } = require('express');
const express = require('express');
const router = express.Router();
const dbConfig = require('./dbConfig.js')

router.get('/search_date', (req, res) => {
    const queryText = 'SELECT * FROM todolist WHERE date = $1';
    const values =[
        req.query.date
    ];
    dbConfig.dbClient
            .query(queryText, values)
            .then(result => res.send(result))
            .catch(e => console.log(e.stack));
});

router.post('/create', (req, res) => {
    console.log("!!!!!!");
    const queryText = 'INSERT INTO todolist' +
                            '(date, time, title, contents, type, status) ' +
                            'VALUES ' +
                            '($1, $2, $3, $4, $5, $6)';
                    
    const values =[
        req.body.date,
        req.body.time,
        req.body.title,
        req.body.contents,
        req.body.type,
        req.body.status
    ];

    dbConfig.dbClient
        .query(queryText, values)
        .then(result => res.send(result))
        .catch(e => console.log(e.stack));

});

router.put('/update', (req, res) => {
    const queryText = 'UPDATE todolist ' +
                            'SET ' +
                            'date = $1, ' +
                            'time = $2, ' +
                            'title = $3, ' +
                            'contents = $4, ' +
                            'type = $5, ' +
                            'status = $6 ' +
                            'WHERE id = $7';

    const values =[
        req.body.date,
        req.body.time,
        req.body.title,
        req.body.contents,
        req.body.type,
        req.body.status,
        req.body.id
    ];

    dbConfig.dbClient
        .query(queryText, values)
        .then(result => res.send(result))
        .catch(e => console.log(e.stack));

})

router.delete('/delete', (req, res) => {
	console.log(req.query);
	const queryText = 'DELETE FROM todolist WHERE id = $1';
	const values =[
		req.query.id
	];
	dbConfig.dbClient
			.query(queryText, values)
			.then(result => res.send(result))
			.catch(e => console.log(e.stack));

});

router.get('/search_all', (req, res) => {
    const objType = JSON.parse(req.query.valType);
    const objStatus = JSON.parse(req.query.valStatus);

    console.log(req.query);
    console.log('req.qeury.valType.plan', objType.plan);

    let queryText = '';

    if(req.query.mode === 'total') {
        queryText = queryText + 'SELECT COUNT(*) FROM todolist WHERE ';
    }
    else if(req.query.mode === 'page'){
        queryText = queryText + 'SELECT * FROM todolist WHERE ';
    }

    if(req.query.fromDate === '' && req.query.toDate === ''){
    }
    else if(req.query.fromDate !== '' && req.query.toDate !== ''){
        queryText = queryText + "(date BETWEEN '"+ req.query.fromDate +"' AND '" + req.query.toDate + "') AND ";
    }
    else if(req.query.fromDate !== '' && req.query.toDate === ''){
        queryText = queryText + "(date >= '" + req.query.fromDate + "') AND ";
    }
    else if(req.query.fromDate === '' && req.query.toDate !== ''){
        queryText = queryText + "(date <= '" + req.query.toDate + "') AND ";
    }

    if(req.query.keyword !== '') {
        queryText = queryText + "(title LIKE '%" + req.query.keyword + "%') AND " +
                                                    "(contents LIKE '%" + req.query.keyword + "%') AND ";
    }

    let count = 0;
    queryText = queryText + "(";
    if(objType.plan === true) {
        queryText = queryText + "type = 'plan' ";
        count++;
    }
    if(objType.promise === true){
        if(count > 0) {
            queryText = queryText + "OR type = 'promise' ";
        }
        else{
            queryText = queryText + "type = 'promise' ";
        }
        count++;
    }
    if(objType.duty === true){
        if(count > 0) {
            queryText = queryText + "OR type = 'duty' ";
        }
        else {
            queryText = queryText + "type = 'duty' ";
        }
    }
    queryText = queryText + ") AND";

    count = 0;
    queryText =queryText + "(";
    if(objStatus.notyet === true) {
        queryText = queryText + "status = 'notyet' ";
        count++;
    }
    if(objStatus.done === true) {
        if(count > 0){
            queryText = queryText + "OR status = 'done' ";
        }
        else {
            queryText = queryText + "status = 'done' ";
        }
        count++;
    }
    if(objStatus.canceled === true){
        if(count > 0){
            queryText = queryText + "OR status = 'canceled' ";
        }
        else {
            queryText = queryText + "status = 'canceled' ";
        }
    }
    queryText = queryText + ") ";

    if(req.query.mode === "page"){
        queryText = queryText + "ORDER BY date DESC, time ASC LIMIT 10 OFFSET " + req.query.offset;
    }

    console.log(queryText);

    const values=[];
    dbConfig.dbClient
            .query(queryText, values)
            .then(result => res.send(result))
            .catch(e => res.send(e));
});

module.exports = router;