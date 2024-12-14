import React from "react";
import "./Legal.css";

const Legal: React.FC = () => {
  return (
    <div className="legal-container">
      <h2 className="legal-title">Legal</h2>
      <br />
      <p className="legal-paragraph-start">
        The services and products are offered by{" "}
        <a href="https://gerberservices.com" className="legal-link">
          Gerber Services
        </a>
      </p>
      <h3 className="legal-subtitle">About our Services</h3>
      <p className="legal-paragraph">
        URBAN-AI provides architectural and civil engineering insights from
        building images. Users can purchase tokens to access various services,
        including exploring curated datasets, analyzing personal images, and
        obtaining large-scale insights. Tokens are scalable for individual or
        industry use and can be bought directly through our platform.
      </p>
      <h3 className="legal-subtitle">Customer service contact details</h3>
      <p className="legal-paragraph">
        You can reach us via email at{" "}
        <a href="mailto:support@urban-ai.ch" className="legal-link">
          support@urban-ai.ch
        </a>{" "}
        or through our{" "}
        <a href="https://urban-ai.ch/contact" className="legal-link">
          contact form
        </a>
        .
      </p>
      <h3 className="legal-subtitle">Warranty</h3>
      <p className="legal-paragraph">
        We guarantee that you will receive the services associated with the
        tokens purchased. However, please note that refunds or chargebacks are
        not possible. If the service is not provided, we will refund the
        equivalent tokens, but no monetary refunds will be issued.
      </p>
      <h3 className="legal-subtitle">Cancellation policy</h3>
      <p className="legal-paragraph">
        Please note that cancellation is not guaranteed. However, it may be
        possible as long as the tokens have not been credited to your account.
      </p>
      <h3 className="legal-subtitle">Data Protection</h3>
      <p className="legal-paragraph">
        We are committed to protecting your privacy and handling your personal
        data with the utmost care. The data collected through our platform is
        used solely for the purpose of providing our services and improving user
        experience. We ensure that your data is stored securely and processed in
        compliance with applicable data protection laws.
      </p>
      <h3 className="legal-subtitle">Applicable Law and Jurisdiction</h3>
      <p className="legal-paragraph">
        In the event of a dispute, the competent court in Switzerland shall have
        jurisdiction, and Swiss law shall apply.
      </p>
    </div>
  );
};

export default Legal;
