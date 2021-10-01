import React, {useState, useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({socket, username, room}) => {
    const [message, setMessage] = useState('');
    const [messagesList, setMessagesList] = useState([]);

    const sendMessage = async () => {
        if(message !== ''){
            const messageData = {
                type: 'msg-chat', username, room, message,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            console.log(messageData);
            await socket.emit('send-message', messageData);
            setMessagesList((list) => [...list, messageData]);
            setMessage('');
        }
    };

    useEffect(() => {
        socket.on('receive-message', data => {
            setMessagesList((list) => [...list, data]);
        })
        socket.on('join-info', data => {
            console.log(data);
            const messageData = {
                username: data.username,
                room: data.room,
                type: 'msg-info'
            }
            socket.emit('send-message', messageData);
            setMessagesList((list) => [...list, messageData]);
        })
    }, [socket])

    return (
        <> 
            <h1 className = 'chat-room-nr'>Room Number: {room}</h1>
            <div className = 'chat-box'>
                <ScrollToBottom className = 'msg-scroll'>
                <div className = 'chat-body'>
                    {messagesList.map(msg => {
                        let msgClass = '';
                        if(msg.username === username){
                            msgClass = 'msg msg-green';
                        }
                        else{
                            msgClass = 'msg msg-blue';
                        }

                        if(msg.type === 'msg-info'){
                            return <div key = {msg.username + ' ' + Math.random() * 10} className = 'msg msg-info'>{msg.username} joined {msg.room}</div>
                        }
                        else{
                            return <div key = {msg.message + ' ' + Math.random() * 10} className = {msgClass}>
                                <div className = 'msg-body'>
                                    <p>{msg.username} said: {msg.message}</p>
                                    <p className = 'msg-timestamp'>{msg.time}</p>
                                </div>
                            </div>
                        }
                    })}
                </div>
                </ScrollToBottom>
                <div className = 'chat-msg-box'>
                    <input type = 'text' value = {message} 
                    onChange = {(e) => {setMessage(e.target.value)}}
                    onKeyPress = {(e) => {
                        if(e.key === 'Enter'){
                            sendMessage();
                        }
                    }} 
                    />
                    <button onClick = {sendMessage}>Send</button>
                </div>
            </div>
        </>
    )
}

export default Chat
