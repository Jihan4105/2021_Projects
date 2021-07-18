const express = require('express');
const router = express.Router();
const dbConfig = require('../dbConfig.js')

router.get('/list', (req, res) => {
    const text = req.body.name;
    const queryText = 'SELECT * FROM movies';
    const values =[];
    dbConfig.dbClient
        .query(queryText, values)
        .then(result => res.send(result))
        .catch(e => console.log(e.stack));

});

router.post('/insert', (req, res) => {
    const queryText = 'INSERT INTO movies (title, year) VALUES ($1, $2)';
    const values =[req.body.title, req.body.year];
    dbConfig.dbClient
        .query(queryText, values)
        .then( result => res.send(result))
        .catch(e => console.log(e.stack));

});

router.put('/update', (req, res) => {
    const queryText = 'UPDATE movies SET title = $1, year = $2 WHERE id = $3';
    const values =[req.body.title, req.body.year, req.body.id];
    dbConfig.dbClient
        .query(queryText, values)
        .then( result => res.send(result))
        .catch(e => console.log(e.stack));

});

router.delete('/delete', (req, res) => {
    const queryText = 'DELETE FROM movies WHERE id = $1';
    const values =[req.body.id];
    console.log(req.params);
    console.log(req.body);
    dbConfig.dbClient
        .query(queryText, values)
        .then( result => {res.send(result); console.log("deleted.....");})
        .catch(e => console.log(e.stack));

});

module.exports = router;