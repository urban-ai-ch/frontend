import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useApi } from "../ApiContext";

type AuthTokenResponse = {
  token: string;
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Used for navigation
  const { login } = useAuth();
  const { fetch } = useApi();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/auth/v1/signin", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      const data: AuthTokenResponse = await response.json();
      login(data.token);
      setError("");
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleCreateAccount = () => {
    navigate("/register"); // Navigate to the registration page
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Error Message */}
        {error && <div className="form-error">{error}</div>}

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>

      {/* Create Account Option */}
      <div className="create-account">
        <p className="create-account-text">Don't have an account?</p>
        <button onClick={handleCreateAccount} className="create-account-button">
          Create an Account
        </button>
      </div>
    </div>
  );
}
