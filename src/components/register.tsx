import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Used for navigation

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      const response = await apiRequest("/auth/v1/signup", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.status === "success") {
        setError("");
        navigate("/login");
      } else {
        setError("Username already exists");
      }
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Create Account</h1>
      <form onSubmit={handleRegister} className="register-form">
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

        <div className="form-group">
          {/* Email Field */}
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="Enter your email"
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

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            placeholder="Confirm your password"
            required
          />
        </div>

        {/* Error Message */}
        {error && <div className="form-error">{error}</div>}

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>

      {/* Redirect to Login Option */}
      <div className="redirect-login">
        <p className="redirect-login-text">Already have an account?</p>
        <button
          onClick={() => navigate("/login")}
          className="redirect-login-button"
        >
          Login
        </button>
      </div>
    </div>
  );
}
