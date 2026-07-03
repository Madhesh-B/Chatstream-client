import React from "react";
import { Outlet } from "react-router-dom";

import logo from "./../assets/Chatstream_logo.webp";

const AuthLayout = () => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-black">
      <div
        className="card w-100 h-100 d-flex flex-row bg-black text-light"
        style={{ height: "65%", borderRadius: "20px" }}
      >
        <div
          className="d-flex justify-content-center align-items-center user-select-none"
          style={{ width: "70%" }}
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
            className="text-light fw-fw-semibold"
            style={{ fontSize: "90px" }}
          >
            Chatstream
          </div>
        </div>
        <div
          className="border-start border-light d-flex justify-content-center align-items-center"
          style={{ width: "30%" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
