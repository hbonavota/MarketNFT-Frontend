import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { TransactionStripe } from "../../../actions/StripeTransaction";
import { Button } from '@material-ui/core'
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { makeStyles } from '@material-ui/core/styles';
import {getLS} from '../../../actions/getLS'
import cartDB from '../../../actions/shoppingCart/cartDB.js'
import  { useEffect } from 'react'

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const useStyle = makeStyles({
  button: {
    margin: '5px',
  }
})
function Stripe() {
  const classes = useStyle();
  
  const userLogged= useSelector((state) => state.userLogged);
  const stripePromise = loadStripe("pk_test_51JW0tcIjGDmG2UQfAkI8szNjoLv5Ub72nxET50aEEsFKFgGGAZECrupO2Uxgp13JtpxGxSD2mtunzeSYWvK3WrJy00al1P3DwN");
  const dispatch = useDispatch();
  const purchaseOrder = useSelector((state) => state.shoppingCartPayment);
  useEffect(() => {
    if(!userLogged){
        dispatch(getLS())
    }else{
        
        dispatch (cartDB(userLogged))
    }
  }, [dispatch])

const [loading, setLoading] = useState(false);


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    console.log('handleSubmit funciona');
    e.preventDefault();

    //Generar Payment
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      // console.log(paymentMethod)
      const { id } = paymentMethod;

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
    }
  };

  const [StripeOption, setStripeOption] = useState(true);
 
  return (
    <div>
      <Button className={classes.button} type="button" onClick={() => setStripeOption(!StripeOption)} 
                    color='primary' variant='contained'> {StripeOption ? 'Stripe' : 'Stripe'}
      </Button>

      {StripeOption ? (
        <div >

        </div>
      ) : (
        <form className={classes.root} noValidate autoComplete="off"  onSubmit={() => setLoading(!loading)}>
            <CreditCardIcon color="primary" size="large"/>
              <CardElement />
                  <Button    color="primary" variant="contained" onClick={(e) => handleSubmit(e)} disabled={!stripe}>
                    {loading ? (
                        <div  role="status"> <span ></span> </div>
                      ) : "Buy"}   
                  </Button>
        </form>    
      )}
    </div>
  );
};

  return (
    <Elements stripe={stripePromise}>
            <CheckoutForm />
    </Elements>
  );
}

export default Stripe;