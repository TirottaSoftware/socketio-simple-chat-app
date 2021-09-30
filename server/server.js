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

    socket.on('join-room', (room, username) => {
        socket.join(room)
        console.log(`${socket.id} joined room: ${room}`)
        socket.emit('join-info', {username, room})
    })
    
    socket.on('send-message', data => {
        socket.to(data.room).emit('receive-message', data);
    })

    socket.on('disconnect', () => {
        console.log('Disconnected.')
    })
})

server.listen(3001, () => {
    console.log('Listening on 3001')
})