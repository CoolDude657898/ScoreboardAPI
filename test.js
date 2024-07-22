const express = require('express');
const http = require('http');
const OBSWebSocket = require('obs-websocket-js').default;

const app = express();
const server = http.createServer(app);
const obs = new OBSWebSocket();

const OBS_WEBSOCKET_URL = 'ws://localhost:4455';
const OBS_WEBSOCKET_PASSWORD = '123456';

app.use(express.json());

app.post('/data', async (req, res) => {
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