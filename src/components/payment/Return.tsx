import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import "./Return.css";
import { useApi } from "../../ApiContext";

type SessionStatusResponse = {
  status: string;
  quantity: number;
  amount_total: number;
  customer_email: string | null;
};

const Return: React.FC = () => {
  const { fetch } = useApi();

  const [status, setStatus] = useState<string | null>(null);

  const [tokenQuantity, setTokenQuantity] = useState<number | null | undefined>(
    null
  );
  const [cost, setCost] = useState<number | null | undefined>(null);

  const [customerEmail, setCustomerEmail] = useState("");
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/"); // Navigate to the home page
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(`/tokens/v1/session-status?session_id=${sessionId}`).then(
      async (response) => {
        const data: SessionStatusResponse = await response.json();
        setStatus(data.status);
        setTokenQuantity(data.quantity);
        setCost(data.amount_total);
        setCustomerEmail(data.customer_email ?? "");
      }
    );
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "success") {
    return (
      <section id="success" className="transaction-status-message">
        <h1>Thank you for your purchase.</h1>
        <p>An email confirmation has been sent to {customerEmail}.</p>
        <p>
          If you have any questions, please feel free to reach out to our
          support team <Link to="/contact">here</Link>.
        </p>
        <ul>
          <li>Tokens purchased: {tokenQuantity}</li>
          <li>Total spent: {cost}</li>
        </ul>
        <button onClick={handleReturnHome} className="explore-button primary">
          Explore
        </button>
      </section>
    );
  } else {
    return (
      <section id="failure" className="transaction-status-message">
        <h1>Something went wrong...</h1>
        <p>
          We're sorry, but we were unable to process your payment. Please
          double-check your payment details and try again. If the issue
          persists, consider using a different payment method or contacting your
          bank for assistance.{" "}
        </p>
        <span>
          <strong className="need-help-message">Need help?</strong>
        </span>
        <p>
          <ul>
            <li>Check your payment information for any errors.</li>
            <li>
              Ensure that your payment method has sufficient funds or is active.
            </li>
            <li>Try again with a different payment method.</li>
          </ul>
        </p>
        <p>
          If you continue to face issues, feel free to reach out to our support
          team <Link to="/contact">here</Link>.
        </p>
        <button onClick={handleReturnHome} className="explore-button secondary">
          Back to home
        </button>
      </section>
    );
  }
};

export default Return;
