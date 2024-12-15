import React from "react";
import PricingCard from "./PricingCard";
import "./PricingPage.css";

const PricingPage: React.FC = () => {
  return (
    <div className="pricing-page">
      <h1 className="pricing-page-title">Our Pricing Plans</h1>
      <div className="pricing-cards-container">
        <PricingCard
          title="Basic Plan"
          subtitle="For individuals"
          price="10/month"
          link="/basic-plan"
			 buttonText="Select Basic"
          features={[
            { text: "Access to basic features", available: true },
            { text: "10 GB storage", available: true },
            { text: "Email support", available: true },
            { text: "Custom domain", available: false },
          ]}
        />
        <PricingCard
          title="Pro Plan"
          subtitle="For small teams"
          price="30/month"
          link="/pro-plan"
			 buttonText="Select Pro"
          features={[
            { text: "Access to all features", available: true },
            { text: "100 GB storage", available: true },
            { text: "Priority email support", available: true },
            { text: "Custom domain", available: true },
          ]}
        />
        <PricingCard
          title="Enterprise Plan"
          subtitle="For large organizations"
          price="100/month"
          link="/enterprise-plan"
			 buttonText="Select Enterprise"
          features={[
            { text: "Dedicated account manager", available: true },
            { text: "Unlimited storage", available: true },
            { text: "24/7 phone support", available: true },
            { text: "Custom integrations", available: true },
          ]}
        />
      </div>
    </div>
  );
};

export default PricingPage;
