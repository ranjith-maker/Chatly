import { io } from "socket.io-client";


let socket = null;

export const initializeSocket = (userId) => {
  if (socket) return socket;

  socket = io(import.meta.env.VITE_BASE_URL, {
    query: { userId },
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};




