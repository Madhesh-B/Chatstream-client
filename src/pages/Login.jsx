import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { Toast } from "react-bootstrap";

const Login = () => {
  const [credientials, setCredientials] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });
  const [show, setShow] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    text: "",
    type: "",
  });

  useEffect(() => {
    if (toastMessage.text && toastMessage.type) {
      setShow(true);
    }
  }, [toastMessage]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setCredientials((prevCredientials) => ({
      ...prevCredientials,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = () => {
    if (!credientials.userName || !credientials.password) {
      setToastMessage({
        text: "Please fill in all fields.",
        type: "error",
      });
      return;
    }
    setToastMessage({
      text: "Login Successful!",
      type: "success",
    });
  };

  return (
    <>
      <Toast
        show={show}
        onClose={() => setShow(false)}
        delay={3000}
        autohide
        style={{ top: "20px", right: "20px", zIndex: 9999 }}
        className={`position-fixed end-0 m-3 ${toastMessage.type === "success" ? "bg-success" : "bg-danger"}`}
      >
        <Toast.Body>
          <div className="w-100 d-flex align-items-center justify-content-between">
            <div className="text-light">{toastMessage.text}</div>
            <X
              size={20}
              onClick={() => setShow(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </Toast.Body>
      </Toast>
      <div className="w-100 px-4 pt-3">
        <div className="text-light h1 text-center mb-5">Login</div>
        <div className="form-control bg-black border-0">
          <label htmlFor="username" className="form-label text-secondary ms-2">
            Enter Your Username or email:
          </label>
          <input
            type="text"
            className="form-control bg-black text-light border border-secondary"
            value={credientials.userName}
            onChange={handleInputChange}
            name="username"
            autoCorrect="off"
            autoCapitalize="off"
            id="userName"
          />
        </div>
        <div className="form-control bg-black border-0">
          <label htmlFor="password" className="form-label text-secondary ms-2">
            Enter Your Password:
          </label>
          <input
            type="password"
            className="form-control bg-black text-light border border-secondary"
            id="password"
            value={credientials.password}
            onChange={handleInputChange}
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
          <label htmlFor="rememberMe" className="text-secondary ms-2">
            Remember Me:
          </label>
        </div>
        <div className="mx-auto mt-3" style={{ width: "90%" }}>
          <button className="btn btn-outline-light py-2 w-100 mt-3" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div
          className="mx-auto mt-2 w-100 text-center"
          style={{ width: "100%" }}
        >
          <span className="text-secondary">
            Don't Have an Account?{" "}
            <Link to="/signup" className="text-decoration-none">
              Register Here
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
