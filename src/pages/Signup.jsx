import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const Signup = () => {
  const [credientials, setCredientials] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [warning, setWarning] = useState("");

  useEffect(() => {
    console.log(credientials);
  }, [credientials]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setCredientials((prevCredientials) => ({
      ...prevCredientials,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = () => {
    if (
      !credientials.userName ||
      !credientials.email ||
      !credientials.password
    ) {
      setWarning("Please fill in all fields.");
      return;
    }
    if (credientials.password.length < 6) {
      setWarning("Password must be at least 6 characters long.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credientials.email)) {
      setWarning("Please enter a valid email address.");
      return;
    }

    setWarning("");
  };

  return (
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
          type="text"
          className="form-control bg-black text-light border border-secondary"
          style={{ paddingLeft: "30px" }}
          value={credientials.userName}
          onChange={handleInputChange}
          spellCheck="false"
          autoCorrect="off"
          autoCapitalize="off"
          id="userName"
        />
      </div>
      <div className="form-control bg-black border-0">
        <label htmlFor="username" className="form-label text-secondary ms-2">
          Enter Your email:
        </label>
        <input
          type="text"
          className="form-control bg-black text-light border border-secondary"
          style={{ paddingLeft: "30px" }}
          value={credientials.email}
          onChange={handleInputChange}
          autoCorrect="off"
          autoCapitalize="off"
          id="email"
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
          autoComplete="new-password"
          onChange={handleInputChange}
        />
        <div className="w-100 ms-2 mt-2" style={{ height: "10px" }}>
          <div className="text-danger">{warning}</div>
        </div>
      </div>
      <div className="mx-auto" style={{ width: "93%" }}>
        <button
          className="btn btn-outline-light d-flex justify-content-center align-items-center gap-2 py-2 w-100 mt-3"
          onClick={handleSignup}
        >
          <span className="h6 mt-2">Signup</span>
        </button>
      </div>
      <div className="mx-auto mt-2 w-100 text-center" style={{ width: "100%" }}>
        <span className="text-secondary">
          Already Have an Account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login Here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
