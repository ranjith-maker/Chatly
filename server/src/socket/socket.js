import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chatly-nkmu.onrender.com",
  },
});

// helper
const getOnlineUsers = async () => {
  const sockets = await io.fetchSockets();

  const users = new Set();

  sockets.forEach((socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) users.add(userId);
  });

  return [...users];
};

io.on("connection", async (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    socket.join(userId);
  }

  socket.on("joinChat", (roomId) => {
    socket.join(roomId);
  });

  io.emit("getOnlineUsers", await getOnlineUsers());

  socket.on("disconnect", async () => {
    io.emit("getOnlineUsers", await getOnlineUsers());
  });
});

export { server, app, io };



