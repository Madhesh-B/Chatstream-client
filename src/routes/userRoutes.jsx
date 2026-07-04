import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

import Profile from "./../pages/user/Profile";
import { initializeData } from "./../features/authSlice";
import { fethData } from "../api/fethData";

const userRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) return;
    const uid = Cookie.get("uid");
    if (!uid) return navigate("/login");
    const fetchUserData = async () => {
      const res = await fethData();
      const { userName, email, role, uid, profileURL } = res.data;
      dispatch(initializeData({ userName, email, role, uid, profileURL }));
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default userRoutes;
