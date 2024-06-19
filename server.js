const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the cors package

const app = express();
app.use(cors()); // Enable CORS

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => { console.log('user disconnected') });

    socket.on('message', (message) => {
        console.log('message received:', message);
        io.emit('message', message);
    });
});

app.get('/isAlive', (req, res) => { res.send('Server is alive'); });


server.listen(3001, () => { console.log('listening on *:3001') });
