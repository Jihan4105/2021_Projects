const express = require('express');
const app = express();
const cors = require('cors');

const port = 3001;
const movie_router = require('./router/movie_router');

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/movies', movie_router);

app.get('/server', (req, res) => {
   res.send('Hello Express'); 
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

