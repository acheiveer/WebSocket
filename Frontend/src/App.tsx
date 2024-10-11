import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestmessage, setLatestmessage] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      setSocket(newSocket);
      newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setLatestmessage(message.data);
    }
    
    return () => newSocket.close();
  }, [])


  if(!socket){
    return <div>
      Connecting to socket server.....
    </div>
  }

  return (
    <>
      <input onChange={(e)=>{
        setMessage(e.target.value)
      }}></input>
      <button onClick={()=>{
        socket.send(message);
      }}>Send
      </button>
      {latestmessage} 
    </>
  )
}

export default App
