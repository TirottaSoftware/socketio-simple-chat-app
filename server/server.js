const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000"
    }
});

io.on('connection', (socket) => {
    console.log(`${socket.id} connected.`)

    socket.on('join-room', (room) => {
        console.log(`${socket.id} joined room: ${room}`)
    })

    socket.on('disconnect', () => {
        console.log('Disconnected.')
    })
})

server.listen(3001, () => {
    console.log('Listening on 3001')
})