import React, { useState } from "react";
//import "bootswatch/dist/lux/bootstrap.min.css";
import   "./Stripe";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";

function Stripe() {

const stripePromise = loadStripe("pk_test_51JW0tcIjGDmG2UQfAkI8szNjoLv5Ub72nxET50aEEsFKFgGGAZECrupO2Uxgp13JtpxGxSD2mtunzeSYWvK3WrJy00al1P3DwN");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log('handleSubmit funciona');
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
       console.log(paymentMethod)
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id,
            amount: 10000, //cents
          }
        );
        console.log('Data: ', data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log('Error: ', error);
      }
      setLoading(false);
      console.log('Error: ', error);
    }
  };

  console.log(!stripe || loading);

  return (
    <form  onSubmit={handleSubmit}>
      {/* Product Information */}
{/*       <img src="https://www.pinclipart.com/picdir/big/570-5704113_sonic-running-png-clipart-png-download-running-classic.png"
         alt="nft-blockchain"
         /> */}

      {/* <h3 >Price: 100$</h3> */}

      {/* User Card Input */}

      <button className="button" disabled={!stripe}>
      {loading ? (
        <div  role="status">
          <span ></span>
        </div>
      ) : "Stripe"}
    </button>
    </form>
    /*       <div >
        <CardElement />
      </div> */
  );
};

  return (
    <Elements stripe={stripePromise}>
      <div >
        <div >
          <div >
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Stripe;