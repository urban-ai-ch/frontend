// import React from "react";
import ExploreButton from "./ExploreButton"; // Import the reusable button
import "./BigHeroSection.css";
import HomePagemap from "../img/HomePagemap6.jpeg";
import { useAuth } from "../AuthContext";

const BigHeroSection = () => {

  const auth = useAuth();

  return (
    <div className="big-hero-section">
      <img
        src={HomePagemap}
        alt="Big Hero Background"
        className="hero-image"
      />
      <div className="hero-content">
        <h1>Visualize urban data on the circular economy like never before</h1>
        <ExploreButton label="Explore" to={auth.isAuthenticated ? "/tool" : "/login"} variant="primary" />
      </div>
      <div className="image-source">
        © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors
      </div>
    </div>
  );
};

export default BigHeroSection;
