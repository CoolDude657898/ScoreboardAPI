const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.post('/data', (req, res) => {
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        console.log('Recieved Data', data);

        res.status(200).send('Data Received');
    });
});

server.listen(8080, () => {
    console.log("Server listening on port 8080");
});