const express = require('express');
const http = require('http');
const OBSWebSocket = require('obs-websocket-js').default;

const app = express();
const server = http.createServer(app);
const obs = new OBSWebSocket();

const OBS_WEBSOCKET_URL = 'ws://0.tcp.ngrok.io:15079';
const OBS_WEBSOCKET_PASSWORD = '123456';

app.post('/data', (req, res) => {
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', async () => {
        console.log('Recieved Data', data);
        dataParsed = JSON.parse(data);
        homeScore = dataParsed.homeScore.toString(10);

        try {
            await obs.connect(OBS_WEBSOCKET_URL, OBS_WEBSOCKET_PASSWORD);
            console.log('Connected to OBS WebSocket');

            // Update text source in OBS
            const sourceName = 'Score'; // Name of the text source in OBS
            await obs.call('SetInputSettings', {
                inputName: sourceName,
                inputSettings: {
                    "text": homeScore
                }
            });
        } catch (error) {
            console.error('Error connecting to OBS WebSocket:', error);
        } finally {
            await obs.disconnect();
        }

        res.status(200).send('Data Received and Text Updated');  
    });
});

server.listen(8080, () => {
    console.log("Server listening on port 8080");
});