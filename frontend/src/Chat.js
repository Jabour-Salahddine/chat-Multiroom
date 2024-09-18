import React, { useEffect, useState } from "react";


function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  

  const sendMessage = async () => {

    if (currentMessage !== "") {

      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      
      
    }
  };

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {

      setMessageList((list) => [...list, data]);
    });
  }, [socket]);


  return (
    <div className="chat-window">
      <div className="header">
        <p>Our Chat</p>
      </div>
      <div className="body">
          {messageList.map((messagecontent) =>{ 
           
           return(
            <div className="message" id={username === messagecontent.author ? "me" : "other" }> 
              <div>
                <div className="centenu">
                  <p>{messagecontent.message}</p>
                </div>

                <div className="info">
                  <p>{messagecontent.author}</p>
                  <p>{messagecontent.time}</p>
                </div>   


              </div>

            </div>

           )
           
           
         })}
        
      </div>
      <div className="footer">
         <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />

         <button onClick={sendMessage}>&#9658;</button>
       </div>
    </div>
  );
}

export default Chat;