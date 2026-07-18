import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";

import { useLogin } from "../hooks/auth";
import { useToaster } from "../hooks/toast";

const Login = () => {
  const [credientials, setCredientials] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);

  const userNameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const login = useLogin();
  const toast = useToaster();

  useEffect(() => {
    document.title = "ChatStream • Login";
  }, []);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setCredientials((prevCredientials) => ({
      ...prevCredientials,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async () => {
    let userName = credientials.userName.trim();
    let password = credientials.password.trim();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userName))
      userName = userName.toLowerCase();

    if (!userName || !password)
      return toast("Please fill in all fields.", "error");

    setLoading(true);

    const res = await login(userName, password, credientials.rememberMe);
    setLoading(false);

    if (res) return toast(res, "error");
    toast("Login Successful!", "success");
  };

  return (
    <div className="w-100 px-4 pt-3">
      <div className="text-center mb-5">
        <div className="text-light h1">Login</div>
        <div className="text-secondary text-sm-center">Welcome Back!</div>
      </div>
      <div className="position-relative form-control bg-black border-0">
        <label htmlFor="username" className="form-label text-secondary ms-2">
          Enter Your Username or email:
        </label>
        <FaUser
          className="position-absolute text-secondary ms-2"
          style={{ top: "60%", left: "12px" }}
        />
        <input
          ref={userNameInputRef}
          type="text"
          className="form-control bg-black text-light border border-secondary"
          style={{ paddingLeft: "30px" }}
          value={credientials.userName}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              passwordInputRef.current.focus();
            }
          }}
          name="username"
          autoCorrect="off"
          autoCapitalize="off"
          autoFocus
          id="userName"
        />
      </div>
      <div className="position-relative form-control bg-black border-0">
        <label htmlFor="password" className="form-label text-secondary ms-2">
          Enter Your Password:
        </label>
        <FaLock
          className="position-absolute text-secondary ms-2"
          style={{ top: "60%", left: "12px" }}
        />
        <input
          ref={passwordInputRef}
          type="password"
          className="form-control bg-black text-light border border-secondary"
          style={{ paddingLeft: "30px" }}
          id="password"
          value={credientials.password}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
      </div>
      <div className="form-control ms-2 d-flex align-items-center bg-black border-0">
        <input
          type="checkbox"
          className="form-check-input  bg-black text-light border border-secondary"
          style={{ cursor: "pointer" }}
          id="rememberMe"
          checked={credientials.rememberMe}
          onChange={handleInputChange}
        />
        <label
          htmlFor="rememberMe"
          className="text-secondary ms-2 user-select-none"
          style={{ cursor: "pointer" }}
        >
          Remember Me:
        </label>
      </div>
      <div className="mx-auto mt-3" style={{ width: "90%" }}>
        <button
          className="btn btn-outline-light py-2 w-100 mt-3"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <div
              className="spinner-border spinner-border-sm"
              style={{ width: "1rem", height: "1rem" }}
            />
          ) : (
            "Login"
          )}
        </button>
      </div>
      <div className="mx-auto mt-2 w-100 text-center" style={{ width: "100%" }}>
        <span className="text-secondary user-select-none">
          Don't Have an Account?{" "}
          <Link to="/signup" className="text-decoration-none">
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
