import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServerCon = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/server')
            .then(response => {
                setMessage(response.data);
                console.log(response.data);
            })
    });

    return (
        <div>
            <h1>Server Connected</h1>
            <div>{message}</div>
        </div>
    );
};

export default ServerCon;