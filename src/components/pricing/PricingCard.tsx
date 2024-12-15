// PricingCard.tsx
import React, { ReactNode } from "react";
import "./PricingCard.css";

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  features: {
	  text: ReactNode; feature: string; available: boolean 
}[];
  buttonText: string;
  onButtonClick: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  price,
  features,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="pricing-card">
      <h2 className="pricing-card-title">{title}</h2>
      <p className="pricing-card-subtitle">{subtitle}</p>
      <div className="pricing-card-price">
        <span className="price-number">{price.split("/")[0]}</span>
        <span className="price-duration">/{price.split("/")[1]}</span>
      </div>
      <button className="pricing-card-button" onClick={onButtonClick}>
        {buttonText}
      </button>
      <ul className="pricing-card-features">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`pricing-card-feature ${
              feature.available ? "available" : "unavailable"
            }`}
          >
            <span
              className={`feature-icon ${
                feature.available ? "tick-icon" : "cross-icon"
              }`}
            >
              {feature.available ? "✔" : "✘"}
            </span>
            <span className="feature-text">{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
