import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initializeData, resetData } from "../features/authSlice";

import api from "../services/api";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return async (username, password, rememberMe) => {
    try {
      const res = await api.post("/api/auth/login", { userName: username, password, rememberMe });
      const { userName, email, role, uid, profileURL } = res.data;
      dispatch(initializeData({ userName, email, role, uid, profileURL }));
      navigate("/user/profile");
    } catch (error) {
      console.log(error);

      return error?.response?.data?.message || "Login failed. Please try again.";
    }
  }
}

export const useSignup = () => {
  const navigate = useNavigate();
  return async (userName, email, password) => {
    try {
      const res = await api.post("/api/auth/signup", { userName, email, password });
      navigate("/login");
    } catch (error) {
      return error?.response?.data?.message || "Signup failed. Please try again.";
    }
  };
}

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return async () => {
    try {
      const res = await api.get("/api/auth/logout");
      dispatch(resetData());
      navigate("/login");
    } catch (error) {
      return error?.response?.data?.message || "Logout failed. Please try again.";
    }
  }
}