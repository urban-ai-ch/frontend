import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import { useCallback } from "react";

import "./Checkout.css";
import { useApi } from "../../ApiContext";

type OrderResponse = {
  clientSecret: string;
};

type OrderPayload = {
  amount: number;
};

const stripePromise = loadStripe(import.meta.env["VITE_STRIPE_PUBLIC_API"]);

const CheckoutForm: React.FC = () => {
  const { fetch } = useApi();
  const fetchClientSecret = useCallback(async () => {
    const payload: OrderPayload = {
      amount: 100,
    };
    return fetch("/payments/v1/create-checkout-session", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then(async (response) => {
      const data: OrderResponse = await response.json();
      return data.clientSecret ?? "";
    });
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
