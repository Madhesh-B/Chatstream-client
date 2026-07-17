import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import loadingReducer from "./../features/loadingSlice";
import toastReducer from "../features/toastSlice";
import chatReducer from "../features/chatSlice";
import chatListReducer from "../features/chatList";

const store = configureStore({
  devTools: true,
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
    toast: toastReducer,
    chat: chatReducer,
    chatList: chatListReducer
  },
});

export default store;