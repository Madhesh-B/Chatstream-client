import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

const store = configureStore({
  devTools: true,
  reducer: {
    auth: authReducer
  }
});

export default store;