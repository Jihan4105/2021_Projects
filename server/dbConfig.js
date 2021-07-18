const DBClient = require('pg').Client;

const dbClient = new DBClient(
    { 
        user: 'postgres', 
        password: 'sam031018', 
        host: 'localhost', 
        port: 5432, 
        database: 'react-basic'
    }
); 


dbClient.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
}); 

module.exports = { 
    dbClient: dbClient 
}