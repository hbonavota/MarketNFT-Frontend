import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { TransactionStripe } from "../../../actions/StripeTransaction";
// import "bootswatch/dist/lux/bootstrap.min.css";
import "./Stripe.css";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";


function Stripe() {

const stripePromise = loadStripe("pk_test_51JW0tcIjGDmG2UQfAkI8szNjoLv5Ub72nxET50aEEsFKFgGGAZECrupO2Uxgp13JtpxGxSD2mtunzeSYWvK3WrJy00al1P3DwN");
const dispatch = useDispatch();
const purchaseOrder = useSelector((state) => state.shoppingTrolley);

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
      // console.log(paymentMethod)
      const { id } = paymentMethod;
        //Tengo que calcular el monto total.
        //purchaseOrder
      try {

        let amount = {
            id,
            purchaseOrder
          }
          dispatch(TransactionStripe(amount));
          elements.getElement(CardElement).clear();

      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  console.log(!stripe || loading);
  const [StripeOption, setStripeOption] = useState(true);
  return (
    <div className="App">
      <button className="button" type="button" onClick={() => setStripeOption(!StripeOption)} >
        {StripeOption ? 'Stripe' : 'Stripe'}
      </button>

      {StripeOption ? (
        <div >

        </div>
      ) : (

    <div className="paymentOption">

        <header className="App-header">

        <form  onSubmit={handleSubmit}>
              <div>
                <div>
                  <CardElement />
                </div>

              <button onClick={(e) => handleSubmit(e)} className="button" disabled={!stripe}>
                {loading ? (
                  <div  role="status">
                    <span ></span>
                  </div>
                ) : "Buy"}
                
             </button>

          </div>
        </form>
    </header>
    </div>    
      )}
    </div>
  );
};

  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row h-100">
          <div className="col-md-4 offset-md-4 h-100">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Stripe;
