// import React from "react";
import "./HomePage.css";
import BigHeroSection from "./BigHeroSection";
import SmallImageWithText from "./SmallImageWithText";
import GallerySection from "./GallerySection";
import ExploreButton from "../ExploreButton";
import homepageSmall1 from "../../img/homepageSmall1.jpeg";
import homepageSmall2 from "../../img/homepageSmall2.jpeg";
// import homepageSmall3 from "../img/homepageSmall3.webp";
// import homepageSmall3 from "../img/homepageSmall3v2.jpeg";
import homepageSmall3 from "../../img/homepageSmall3v3.jpg";
import homepageSmall4 from "../../img/homepageSmall4.jpeg";
import { useAuth } from "../../AuthContext";

const HomePage = () => {

  const auth = useAuth();

  return (
    <div className="homepage-container">
      <BigHeroSection />
      <SmallImageWithText
        imageSrc={homepageSmall1}
        title="AI Output Example"
        description="Obtain intelligent architectural insigts through an AI powered state-of-the art approach."
      />
      <SmallImageWithText
        imageSrc={homepageSmall2}
        title="Historical Score Zurich Example"
        description="Discover a vast and curated dataset from five major cities in the world, including Zurich, Mumbai and Melbourne."
        reverse
      />
      <SmallImageWithText
        imageSrc={homepageSmall3}
        title="Image showing Upload Icon"
        description="Upload your own images to optain information that matters to you."
      />
      <SmallImageWithText
        imageSrc={homepageSmall4}
        title="Image of a building on the street"
        description="Use our Google StreetView integration to obtain high-quality insights into locations you do not have access to."
        reverse
      />
      <GallerySection />
      <div className="explore-button-at-the-bottom">
        <ExploreButton label="Explore" to={auth.isAuthenticated ? "/tool" : "/login"} variant="primary" />
      </div>
    </div>
  );
};

export default HomePage;
