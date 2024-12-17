import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import ExploreButton from "./ExploreButton"; // Import ExploreButtonZ
import { Link } from "react-router-dom";
import LoginDropdown from "./LoginDropdown";
import { useAuth } from "../AuthContext";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isUserIconActive, setIsUserIconActive] = useState(false); // Track user icon state
  // const navigate = useNavigate(); // Hook for programmatic navigation
  const auth = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle user icon click
  // const handleUserIconClick = () => {
  //   const newState = !isUserIconActive;
  //   setIsUserIconActive(newState);
  //   navigate(newState ? "/login" : "/"); // Navigate based on new state
  // };

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
          <img src="eth-logo.svg" alt="logo" className="logo-image" />
        </a>
      </div>

      <div className="navbar-center">
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/tool" onClick={closeMenu}>
              Map
            </Link>
          </li>
          <li>
            <Link to="/urban-ai" onClick={closeMenu}>
              Urban-AI
            </Link>
          </li>
          <li>
            <Link to="/checkout" onClick={closeMenu}>
              Purchase
            </Link>
          </li>
          {/*<li>
            <Link to="/pricing" onClick={closeMenu}>
              Pricing
            </Link>
          </li>*/}
          <li className="navbar-tool-button">
            <Link
              to={auth.isAuthenticated ? "/tool" : "/login"}
              onClick={closeMenu}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu}>
              About us
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/legal" onClick={closeMenu}>
              Legal
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        {/* Explore Link */}
        {/* <Link to="/tool" className="explore-button">
          Explore
        </Link> */}
        <ExploreButton
          label="Explore"
          to={auth.isAuthenticated ? "/tool" : "/login"}
          variant="primary"
        />

        {/* Hamburger Button */}
        <button className="hamburger" onClick={toggleMenu}>
          <i className="fa fa-bars"></i>
        </button>

        {/* User Icon */}
        <LoginDropdown></LoginDropdown>
        {/* <div
          className={`user-icon-container ${isUserIconActive ? "active" : ""}`}
          onClick={handleUserIconClick}
        >
          <i className="fa fa-user user-icon" />
        </div> */}
      </div>
    </nav>
  );
}
