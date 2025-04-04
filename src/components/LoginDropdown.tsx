import React, { useState, useEffect, useRef } from "react";
import "./LoginDropdown.css";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const LoginDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
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
