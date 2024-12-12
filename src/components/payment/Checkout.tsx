import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import { apiRequest } from "../../api";
import { useAuth } from "../../AuthContext";
import { useCallback } from "react";

type OrderResponse = {
  clientSecret: string;
};

type OrderPayload = {
  amount: number;
};

const stripePromise = loadStripe(import.meta.env["VITE_STRIPE_PUBLIC_API"]);

const CheckoutForm: React.FC = () => {
  const { logout } = useAuth();
  const fetchClientSecret = useCallback(async () => {
    const payload: OrderPayload = {
      amount: 100,
    };
    return apiRequest<OrderResponse>(
      "/tokens/v1/create-checkout-session",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      logout
    ).then((response) => response?.data?.clientSecret ?? "");
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;
