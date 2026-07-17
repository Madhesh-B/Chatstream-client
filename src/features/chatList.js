import { createSlice } from "@reduxjs/toolkit";

const chatListSlice = createSlice({
  name: "chatList",
  initialState: {
    chatList: [],
  },
  reducers: {
    initialChatList: (state, action) => {
      state.chatList = action.payload;
    },
  }
});

export const { initialChatList } = chatListSlice.actions;
export default chatListSlice.reducer;