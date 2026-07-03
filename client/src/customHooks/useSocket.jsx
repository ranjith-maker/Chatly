import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeSocket } from "../utils/socket";
import { setOnlineUsers } from "../redux/userSlice";
import { addMessage } from "../redux/messageSlice";

export const useSocket = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (!userData) return;

    const socket = initializeSocket(userData._id);

    // -------------------------
    // ONLINE USERS
    // -------------------------
    socket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    // -------------------------
    // INCOMING MESSAGE ONLY
    // -------------------------
    socket.on("newMessage", (msg) => {
      const otherUserId =
        msg.sender === userData._id ? msg.receiver : msg.sender;

      // IMPORTANT:
      // only update Redux for messages NOT sent by me (avoid duplicates)
      if (msg.sender === userData._id) return;

      dispatch(
        addMessage({
          userId: otherUserId,
          message: msg,
        })
      );
    });

    // -------------------------
    // CLEANUP
    // -------------------------
    return () => {
      socket.off("getOnlineUsers");
      socket.off("newMessage");
      socket.disconnect();
    };
  }, [userData, dispatch]);
};