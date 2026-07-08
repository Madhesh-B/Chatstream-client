import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    isOpen: false,
    message: "",
    type: "",
  },
  reducers: {
    setToast: (state, action) => {
      return { ...state, isOpen: true, message: action.payload.message, type: action.payload.type };
    },
    hideToast: (state) => {
      return { ...state, isOpen: false, message: "", type: "" };
    }
  }
});

export const { setToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;