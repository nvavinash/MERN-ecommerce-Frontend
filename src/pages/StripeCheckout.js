import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import CheckoutForm from "./CheckOutForm";
// import CompletePage from "./CompletePage";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Ohu3MSDNwTsA3NPUjC1rhUYMtKLCJ1Bbyy2zvjdkZw5K5xjuQ2mYWxNT2AF1SetFcZdv50Phpt0If078Hjhu5Gn00k4I9vvX3");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http:localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount : currentOrder.totalAmount }),
      meta:{
        order_id: currentOrder.id 
        // this info will go to stripe => and then to our webhook
        // so we can conclude that payment was successful, even if client closes window after pay
      }
    })
      .then((res) => res.json())
      .then((data) => { 
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Router>
      <div className="App">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <Routes>
              <Route path="/checkout" element={<CheckoutForm dpmCheckerLink={dpmCheckerLink}/>} />
              {/* <Route path="/complete" element={<CompletePage />} /> */}
            </Routes>
          </Elements>
        )}
      </div>
    </Router>
  );
}