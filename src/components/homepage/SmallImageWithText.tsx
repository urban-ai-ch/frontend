import React from "react";
import "./SmallImageWithText.css";

interface SmallImageWithTextProps {
  imageSrc: string;
  title: string;
  description: string;
  reverse?: boolean; // If true, text is on the left and image on the right
}

const SmallImageWithText: React.FC<SmallImageWithTextProps> = ({
  imageSrc,
  title,
  description,
  reverse,
}) => {
  return (
    <div className={`small-image-with-text ${reverse ? "reverse" : ""}`}>
      <img src={imageSrc} alt={title} className="image" />
      <div className="text-content">
        {/* <h2>{title}</h2> */}
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SmallImageWithText;
