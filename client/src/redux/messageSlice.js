import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",

  initialState: {
    conversations: {}
  },

  reducers: {

    // -----------------------------
    // SET full conversation (GET API)
    // -----------------------------
    getConversation: (state, action) => {
      const { userId, messages } = action.payload;

      state.conversations[userId] = {
        messages,
        lastFetched: Date.now()
      };
    },


    // -----------------------------
    // ADD message (send/receive)
    // -----------------------------
    addMessage: (state, action) => {
      const { userId, message } = action.payload;

      if (!state.conversations[userId]) {
        state.conversations[userId] = {
          messages: []
        }
      }
      state.conversations[userId].messages.push(message);
    },


    // -----------------------------
    // CLEAR (logout)
    // -----------------------------
    clearConversations: (state) => {
      state.conversations = {};
    }
  }
});

export const {  getConversation, addMessage, clearConversations } =
 messageSlice.actions;

export default messageSlice.reducer;





/**
 * 
 * Redux:
conversations = {
  userId1: {
    messages: [...]
}}

UI:
conversation = conversations[userId1].messages
 
 * 
 * 
 * 
 * 
 * 
 * 
 */



