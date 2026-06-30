import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import loadingReducer from "./../features/loadingSlice";

const store = configureStore({
  devTools: true,
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  }
});

export default store;