import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    senderName: "",
    chatId: "",
    chats: [],
  },
  reducers: {
    updateSenderInfo: (state, action) => {
      state.senderName = action.payload.name;
      state.chatId = action.payload.chatId
    },
    setPreviousChat: (state, action) => {
      state.chats = action.payload;
    },
    addmessage: (state, action) => {
      const newMessage = {
        id: action.payload.id,
        content: action.payload.content,
        senderId: action.payload.senderId,
        timestamp: action.payload.timestamp,
        isEdited: false,
        isDeleted: false,
      }
      state.chats.push(newMessage);
    },
    editMessage: (state, action) => {
      const { id, content } = action.payload;
      return state.chats.map((message) => {
        if (message.id !== id) return message;
        message.content = content;
        message.isEdited = true;
        return message;
      })
    },
    deleteMessage: (state, action) => {
      const { id, senderName } = action.payload;
      return state.chats.map((message) => {
        if (message.id !== id) return message;
        message.content = `${senderName} deleted the message`;
        message.isDeleted = true;
        return message;
      })
    },
    clearChat: (state) => {
      state.chats = [];
    },
  }
});

export const {
  updateSenderInfo,
  setPreviousChat,
  addmessage,
  editMessage,
  deleteMessage,
  clearChat
} = chatSlice.actions;
export default chatSlice.reducer;