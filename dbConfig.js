const { Client } = require('pg');

const dbClient = new Client(
    {
        user: 'postgres',
        password: 'sam031018',
        host: 'localhost', 
        port: 5432,
        database: 'ToDoList'
    }
);

dbClient.connect(err => {
    if(err){
        console.error('connection error', err.stack)
    }
    else{
        console.log('connected')
    }
});

module.exports = {
    dbClient: dbClient
}