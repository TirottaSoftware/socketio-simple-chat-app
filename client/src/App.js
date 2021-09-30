import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');

function App() {
  
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit('join-room', room)
  }

  const handleUsernameInputChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  }

  const handleRoomInputChange = (e) => {
    e.preventDefault();
    setRoom(e.target.value);
  }

  return (
    <div className="App">
      <input type = 'text' onChange = {handleUsernameInputChange} value = {username} placeholder = 'Username...' />
      <input type = 'text' onChange = {handleRoomInputChange} value = {room} placeholder = 'Room...' />
      <button onClick = {joinRoom}>Join Room</button>
    </div>
  );
}

export default App;