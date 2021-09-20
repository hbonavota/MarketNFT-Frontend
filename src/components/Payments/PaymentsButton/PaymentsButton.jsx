import React, { useState } from "react";
import MercadoPago from '../MercadoPago/MercadoPago';
import MetaMask from '../MetaMask/MetaMask';
import Stripe from '../Stripe/Stripe';
import { makeStyles } from '@material-ui/core/styles'

  const useStyle = makeStyles({
  pay: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  button: {
    margin: '10px',
    width: '50px',
  }
 })

function Payments() {
  const classes = useStyle()

  return (
        <div className={classes.pay}>
            <Stripe />
            <MercadoPago />
            <MetaMask />
        </div>
  );
}

export default Payments;