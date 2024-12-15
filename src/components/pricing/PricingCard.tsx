import React from "react";
import { Link } from "react-router-dom";
import "./PricingCard.css";

interface Feature {
  text: string;
  available: boolean;
}

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  features: Feature[];
  link: string; // Link destination for the button
  buttonText: string; // Individual button text
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  price,
  features,
  link,
  buttonText,
}) => {
  return (
    <div className="pricing-card">
      <h2 className="pricing-card-title">{title}</h2>
      <h3 className="pricing-card-subtitle">{subtitle}</h3>
      <div className="pricing-card-price">
        <span className="price-number">{price.split("/")[0]}</span>
        <span className="price-duration">/{price.split("/")[1]}</span>
      </div>
      <Link to={link} className="pricing-card-button">
			{buttonText}
      </Link>
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
