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

io.on('connection', () => {
    console.log('Connection established.')
    io.on('disconnect', () => {
        console.log('Disconnected.')
    })
})

io.on('connect', socket => {
    console.log(socket.id)
})

server.listen(3001, () => {
    console.log('Listening on 3000')
})