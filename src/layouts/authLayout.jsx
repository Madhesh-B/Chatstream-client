import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "./../assets/images/Chatstream_logo.webp";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user/profile");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container-fluid p-0 w-100 h-100 bg-black">
      <div
        className="row w-100 h-100 mx-auto bg-black text-light"
        style={{ height: "65%", borderRadius: "20px" }}
      >
        <div
          className="d-md-flex d-none justify-content-center align-items-center col-md-8 user-select-none"
        >
          <div className="user-select-none">
            <img
              src={logo}
              alt="Chatstream Logo"
              width={200}
              draggable={false}
            />
          </div>
          <div
            className="text-light fw-semibold"
            style={{ fontSize: "90px" }}
          >
            Chatstream
          </div>
        </div>
        <div
          className="border-start border-light col-md-4 col-12 d-flex justify-content-center align-items-center"
        >
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
