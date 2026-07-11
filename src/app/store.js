import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import loadingReducer from "./../features/loadingSlice";
import toastReducer from "../features/toastSlice";
import chatReducer from "../features/chatSlice";

const store = configureStore({
  devTools: true,
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
    toast: toastReducer,
    chat: chatReducer,
  }
});

export default store;