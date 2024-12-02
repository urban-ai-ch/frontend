import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import ExploreButton from "./ExploreButton"; // Import ExploreButtonZ
import { Link } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserIconActive, setIsUserIconActive] = useState(false); // Track user icon state
  const navigate = useNavigate(); // Hook for programmatic navigation

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle user icon click
  const handleUserIconClick = () => {
    const newState = !isUserIconActive;
    setIsUserIconActive(newState);
    navigate(newState ? "/login" : "/"); // Navigate based on new state
  };

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 830) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          <img src="src/img/eth-logo.svg" alt="logo" className="logo-image" />
        </a>
      </div>

      <div className="navbar-center">
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/code">Code</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        {/* Explore Link */}
        {/* <Link to="/tool" className="explore-button">
          Explore
        </Link> */}
        <ExploreButton label="Explore" to="/tool" variant="primary" />

        {/* Hamburger Button */}
        <button className="hamburger" onClick={toggleMenu}>
          <i className="fa fa-bars"></i>
        </button>

        {/* User Icon */}
        <div
          className={`user-icon-container ${isUserIconActive ? "active" : ""}`}
          onClick={handleUserIconClick}
        >
          <i className="fa fa-user user-icon" />
        </div>
      </div>
    </nav>
  );
}
