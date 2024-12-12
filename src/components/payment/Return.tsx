import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { apiRequest } from "../../api";
import { useAuth } from "../../AuthContext";

type SessionStatusResponse = {
  status: string;
  customer_email: string;
};

const Return: React.FC = () => {
  const { logout } = useAuth();

  const [status, setStatus] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    apiRequest<SessionStatusResponse>(
      `/tokens/v1/session-status?session_id=${sessionId}`,
      {},
      logout
    ).then((response) => {
      setStatus(response.status);
      setCustomerEmail(response.data?.customer_email ?? "");
    });
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "success") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@urban-ai.ch">orders@urban-ai.ch</a>.
        </p>
      </section>
    );
  }

  return null;
};

export default Return;
