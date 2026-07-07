import './login.css';
import Topbar from "../components/layout/Topbar";
function SignUp() {
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
                     <h1> Username</h1>
                    <input class="log-inp" name="username" type="text" placeholder="Enter your username" required />
                    <h1>Email Address</h1>
                    <input class="log-inp" name="email" type="email" placeholder="Enter your mail" required />
                   
                    <h1>Password</h1>
                    <input class="log-inp" name="password" type="password" placeholder="Create password" required />
                    <h1>Confirm Password</h1>
                    <input class="log-inp" name="confirm_password" type="password" placeholder="Conform password" required />
                     <input type="submit" value="Submit" className="btn" />

          <p className="pp">
            You  have an  account? <a href="/login">login</a>
          </p>
        </div>
      </div>
    </div>
    </>
                                    );
}
                                    export default SignUp;