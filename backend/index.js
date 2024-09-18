const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      const { roomName, username } = data;
      if (!roomName || !username) {
        socket.emit("join_error", "Le nom de la salle ou le nom d'utilisateur est manquant.");
        return;
      }
      socket.join(roomName);
      console.log(`User with ID: ${socket.id} joined room: ${roomName}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message",data);
    }); 
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
  
      
    
  


    server.listen(5001, () => {
    console.log("bessmilah");
     });