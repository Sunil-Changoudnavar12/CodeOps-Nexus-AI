import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Topbar from "../components/layout/Topbar";
import { login, saveAuthSession } from "../api/auth";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ login_id: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await login(formData);
      saveAuthSession(data);
      setMessage("Login successful");
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
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <form className="log-info" onSubmit={handleSubmit}>
            <h1>Username or Email</h1>
            <input
              className="log-inp"
              name="login_id"
              type="text"
              placeholder="Enter your username or email"
              required
              value={formData.login_id}
              onChange={handleChange}
            />

            <h1>Password</h1>
            <input
              className="log-inp"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              value={formData.password}
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
              You don't have account? <Link to="/signup">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
