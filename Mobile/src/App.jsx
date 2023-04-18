import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import Login from './components/lobby';
import Game from './components/game';

const url = window.location.href.split(':');
const socket = io(url[0] + ":" + url[1] + ":4000/");

function App() {
  const [connected, setConnected] = useState(socket.connected);
  const [userName, setUserName] = useState('');
  const [admin, setAdmin] = useState(false);
  const [question, setQuestion] = useState(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true);
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    socket.on('startGame', () => {
      if (start) return;
      setStart(true);
    });

    socket.on('first_player_mobile', ({userName}) => {
      setUserName(prev => {
        if (userName === prev) setAdmin(true)
        return prev;
      })
     
    });

    socket.on('newQuestion_mobile', (type) => {
      console.log(type)
      setQuestion(type);
    });

    return () => {
      socket.off('newQuestion_mobile');
      socket.off('first_player_mobile');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('startGame');
    };
  }, []);

  useEffect(() => {
    if(!userName) return
      socket.emit('newUser', userName);
  }, [userName])
  
  const sendUserName = (userName2) => {
    if(!userName2 || userName2 === userName) return;
    setUserName(userName2)
  }

  const startGame = () => {
    socket.emit('userStartGame');
  }

  const sendReponse = (response, position) => {
    socket.emit('newReponse', {response, userName, position});
    setQuestion(null)
  }
  return (
    <div className="App">
      {connected ?
        userName ?
          <Game 
              startGame={startGame} 
              admin={admin} 
              start={start} 
              question={question} 
              sendReponse={sendReponse}
              userName={userName.split('-')[0]}
          /> :
          <Login sendUserName={sendUserName} /> :
        <a>connecting</a>}
    </div>
  );
}

export default App;
