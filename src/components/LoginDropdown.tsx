import React, { useState } from "react";
import "./LoginDropdown.css";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
//import { link } from "fs";

const LoginDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogInOut = () => {
    setIsOpen(false);
    if (!auth.isAuthenticated) navigate("/login");
    else {
      auth.logout();
      navigate("/");
    }
  };

  const handleProfile = () => {
    setIsOpen(false);
    if (auth.isAuthenticated) navigate("/profile");
    else {
      navigate("/login");
    }
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <i className="fa fa-user"></i>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={handleProfile} className="dropdown-item">
            Profile
          </button>
          <button onClick={handleLogInOut} className="dropdown-item">
            {auth.isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginDropdown;
