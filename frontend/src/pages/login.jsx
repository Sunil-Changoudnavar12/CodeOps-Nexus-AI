import Topbar from "../components/layout/Topbar";
import "./login.css";
function Login() {
  return (
    <>
      <Topbar />
       <div className="login-page">
      <div className="login-box">
        <div className="login-label">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <div className="log-info">
          <h1>Username or Email</h1>
          <input
            className="log-inp"
            name="username"
            type="text"
            placeholder="Enter your username or email"
            required
          />

          <h1>Password</h1>
          <input
            className="log-inp"
              name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <input type="submit" value="Submit" className="btn" />

          <p className="pp">
            You don't have account? <a href="/SignUp">Register</a>
          </p>
        </div>
      </div>
    </div>
    </>
   
  );
}

export default Login;