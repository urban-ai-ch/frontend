import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ExploreButton.css";

interface ExploreButtonProps {
  label: string; // Text displayed on the button
  to?: string; // The path to navigate to
  onClick?: () => void; // Optional custom click handler
  variant?: "primary" | "secondary"; // Styling variants
}

const ExploreButton: React.FC<ExploreButtonProps> = ({
  label,
  to,
  onClick,
  variant = "primary",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Call custom onClick handler
    } else if (to) {
      navigate(to); // Navigate to the specified route
    }
  };

  // Use `<Link>` for routing or `<button>` for custom behavior
  return to ? (
    <Link to={to} className={`explore-button ${variant}`}>
      {label}
    </Link>
  ) : (
    <button onClick={handleClick} className={`explore-button ${variant}`}>
      {label}
    </button>
  );
};

export default ExploreButton;
