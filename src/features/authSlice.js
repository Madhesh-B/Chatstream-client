import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    userName: "",
    email: "",
    uid: ""
  },
  reducers: {
    initializeData: (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    }
  }
});

export const { initializeData } = authSlice.actions;
export default authSlice.reducer;