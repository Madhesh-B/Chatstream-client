import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initializeData, resetData } from "../features/authSlice";

import api from "../services/api";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return async (userName, password, rememberMe) => {
    try {
      const res = await api.post("/api/auth/login", { userName, password, rememberMe });
      const { username, email, uid, profileURL } = res.data;
      dispatch(initializeData({ username, email, uid, profileURL }));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  }
}