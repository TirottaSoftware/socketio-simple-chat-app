const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
}, {timestamps: true})

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat