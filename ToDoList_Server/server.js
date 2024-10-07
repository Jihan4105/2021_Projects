const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const todolist_router = require('./todolist_router.js');

app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use('/todolist', todolist_router);

app.get('/todolist', (req, res) => {
    res.send('Hello Express');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
