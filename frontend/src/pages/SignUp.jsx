import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Topbar from "../components/layout/Topbar";
import { saveAuthSession, signup } from "../api/auth";
import "../pages/styles/login.css";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const data = await signup(formData);
      saveAuthSession(data);
      setMessage("Signup successful");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Topbar />
      <div className="login-page">
        <div className="login-box">
          <div className="login-label">
            <h1>Create Account</h1>
            <p>Register to start using your workspace</p>
          </div>

          <form className="log-info" onSubmit={handleSubmit}>
            <h1>Username</h1>
            <input
              className="log-inp"
              name="username"
              type="text"
              placeholder="Enter your username"
              required
              value={formData.username}
              onChange={handleChange}
            />

            <h1>Email Address</h1>
            <input
              className="log-inp"
              name="email"
              type="email"
              placeholder="Enter your mail"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <h1>Password</h1>
            <input
              className="log-inp"
              name="password"
              type="password"
              placeholder="Create password"
              required
              value={formData.password}
              onChange={handleChange}
            />

            <h1>Confirm Password</h1>
            <input
              className="log-inp"
              name="confirm_password"
              type="password"
              placeholder="Confirm password"
              required
              value={formData.confirm_password}
              onChange={handleChange}
            />

            <input
              type="submit"
              value={loading ? "Please wait..." : "Submit"}
              className="btn"
              disabled={loading}
            />
            {message ? <p className="pp">{message}</p> : null}

            <p className="pp">
              You have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
