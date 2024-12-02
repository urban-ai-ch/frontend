import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./InputButton.css";

interface InputButtonProps {
  label: string; // Text displayed on the button
  to?: string; // The path to navigate to
  onClick?: () => void; // Optional custom click handler
  variant?: "primary" | "secondary"; // Styling variants
}

const InputButton: React.FC<InputButtonProps> = ({
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
    <Link to={to} className={`input-button ${variant}`}>
      {label}
    </Link>
  ) : (
    <button onClick={handleClick} className={`input-button ${variant}`}>
      {label}
    </button>
  );
};

export default InputButton;
