import React, { useState } from "react";
import MercadoPago from '../MercadoPago/MercadoPago';
import MetaMask from '../MetaMask/MetaMask';
import Stripe from '../Stripe/Stripe';
import './payments.css';

function Payments() {
  const [paymentOption, setPaymentOption] = useState(true);

  return (
    <div>

      {paymentOption ? (
        <div className="paymentOption">
          <Stripe />
          <MercadoPago />
          <MetaMask />
        </div>
      ) : (
        <div>
          
        </div>
      )}
    </div>
  );
}

export default Payments;