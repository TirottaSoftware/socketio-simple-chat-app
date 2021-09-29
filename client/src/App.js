import './App.css';
import io from 'socket.io-client';

function App() {
  const socket = io.connect('http://localhost:3001');
  
  return (
    <div className="App">
      <h1>Hello React!</h1>
    </div>
  );
}

export default App;
