import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Toast } from "react-bootstrap";
import { X } from "lucide-react";
import { useSignup } from "../hooks/auth";

const Signup = () => {
  const [credientials, setCredientials] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);

  const userNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const signup = useSignup();

  useEffect(() => {
    document.title = "ChatStream • Signup";
  }, []);

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

  const handleSignup = async () => {
    let userName = credientials.userName.trim();
    let email = credientials.email.trim().toLowerCase();
    let password = credientials.password.trim();
    if (!userName || !email || !password) {
      setToastMessage({ text: "Please fill in all fields.", type: "danger" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setToastMessage({
        text: "Please enter a valid email address.",
        type: "danger",
      });
      return;
    }
    if (password.length < 6) {
      setToastMessage({
        text: "Password must be at least 6 characters long.",
        type: "danger",
      });
      return;
    }
    setLoading(true);
    const res = await signup(userName, email, password);
    setLoading(false);
    if (res) {
      setToastMessage({ text: res, type: "danger" });
      return;
    }
    setToastMessage({ text: "Signup successful!", type: "success" });
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
        <div className="text-light h1 text-center mb-5 ">Signup</div>
        <div className="position-relative form-control bg-black border-0">
          <label htmlFor="username" className="form-label text-secondary ms-2">
            Enter Your Username:
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
                emailInputRef.current.focus();
              }
            }}
            spellCheck="false"
            autoCorrect="off"
            autoCapitalize="off"
            id="userName"
          />
        </div>
        <div className="position-relative form-control bg-black border-0">
          <label htmlFor="username" className="form-label text-secondary ms-2">
            Enter Your email:
          </label>
          <FaEnvelope
            className="position-absolute text-secondary ms-2"
            style={{ top: "60%", left: "12px" }}
          />
          <input
            ref={emailInputRef}
            type="text"
            className="form-control bg-black text-light border border-secondary"
            style={{ paddingLeft: "30px" }}
            value={credientials.email}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                passwordInputRef.current.focus();
              }
            }}
            autoCorrect="off"
            autoCapitalize="off"
            id="email"
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
                handleSignup();
              }
            }}
            autoComplete="new-password"
          />
        </div>
        <div className="mx-auto" style={{ width: "93%" }}>
          <button
            className="btn btn-outline-light d-flex justify-content-center align-items-center gap-2 py-2 w-100 mt-3"
            onClick={handleSignup}
          >
            <span className="h6 mb-0">
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm"
                  style={{ width: "1rem", height: "1rem" }}
                />
              ) : (
                "Signup"
              )}
            </span>
          </button>
        </div>
        <div
          className="mx-auto mt-2 w-100 text-center"
          style={{ width: "100%" }}
        >
          <span className="text-secondary">
            Already Have an Account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login Here
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Signup;
