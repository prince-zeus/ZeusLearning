import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import ShowPasswordIcon from '../assets/visibility_black_24dp.svg';
import "./LoginPage.css"

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, is2FAVerified } = useAuth();
  const navigate = useNavigate();

  if(user && !is2FAVerified) {
    return <Navigate to="/verify-2fa" replace />
  }

  if(user && is2FAVerified) {
    return <Navigate to="/" replace />
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    // Here you would usually send a request to your backend to authenticate the user
    // For the sake of this example, we're using a mock authentication
    if (username === "user" && password === "password") {
      // Replace with actual authentication logic
      await login({ username });
    } else {
      alert("Invalid username or password");
    }
  };
  return (
    <div className="login-page-container">
      <form className="login-card" onSubmit={handleLogin}>
        <div className="title">Login</div>

        <div className="text-field-container">
            <input type="text" className="text-field" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email ID*" />
            <div className="forgot-link">FORGOT EMAIL ID?</div>
        </div>

        <div className="text-field-container text-field-container-margin">
            <input type="password" className="text-field" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password*" />
            <img src={ShowPasswordIcon} alt="Show Password Icon" className="text-field-icon" />
            <div className="forgot-link">FORGOT PASSWORD?</div>
        </div>

        <div className="remember-me-container">
            <input type="checkbox" name="remember" id="remember" />
            <label htmlFor="remember">Remember Me</label>
        </div>

        <button className="login-button" type="submit">Log In</button>

        <div className="create-new-account-container">
          <div className="create-new-account-text">Not registered yet?</div>
          <div className="forgot-link" onClick={() => navigate("/register", {replace : true})}>Create An Account</div>
        </div>
      </form>
    </div>
  );
};