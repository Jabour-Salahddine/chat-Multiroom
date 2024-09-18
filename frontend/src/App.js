import './App.css';
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:5001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);



  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", { roomName: room, username: username });
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
      <>  
      <h1 className="titre">U <span> & </span> M</h1>
      <div className="container">
        <h1>Entre Amis!</h1>
        <form id="chatForm">
          <div>
            <input type="text" id="firstName" name="firstName" placeholder="salah..." onChange={(event) => { setUsername(event.target.value) }} />
          </div>
          <div>
            <input type="text" id="chatRoom" name="chatRoom" placeholder="id chat..." onChange={(event) => { setRoom(event.target.value) }} />
          </div>
          <button onClick={joinRoom} type="button" id="joinChatButton">Rejoindre le chat</button>
        </form>
      </div>
      </>
      ) : ( 
      <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
