import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const uid = Cookie.get("uid") || "";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    isAuthenticated: false,
    userName: "",
    email: "",
    role: "",
    uid,
    profileURL: "",
  },
  reducers: {
    initializeData: (state, action) => {      
      state.isAuthenticated = true;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.uid = action.payload.uid;
      state.profileURL = action.payload.profileURL;
    },
    resetData: (state) => {
      state.isAuthenticated = false;
      state.userName = "";
      state.email = "";
      state.role = "";
      state.uid = "";
      state.profileURL = "";
    }
  }
});

export const { initializeData, resetData } = authSlice.actions;
export default authSlice.reducer;