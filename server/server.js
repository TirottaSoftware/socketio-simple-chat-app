const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const Chat = require('./models/Chat')
const { Server } = require('socket.io');

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI
mongoose.connect(uri);

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

        Chat.find({room:room}).then(result => {
            socket.emit('output', result)
        })
        socket.emit('join-info', {username, room})
    })
    
    socket.on('send-message', data => {
        socket.to(data.room).emit('receive-message', data);
            if(data.type === 'msg-chat'){
                addChat(data);
            }
    })

    socket.on('disconnect', () => {
        console.log('Disconnected.')
    })
})

const addChat = (data) => {
    const chat = new Chat({
        type:data.type,
        sender: data.username,
        room: data.room,
        content: data.message,
        time: data.time
    })
    chat.save();
}

server.listen(3001, () => {
    console.log('Listening on 3001')
})