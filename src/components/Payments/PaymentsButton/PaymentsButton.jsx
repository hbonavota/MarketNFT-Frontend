import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MercadoPago from '../MercadoPago/MercadoPago'
import MetaMask from '../MetaMask/MetaMask'
import Stripe from '../Stripe/Stripe'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { getLS } from '../../../actions/getLS'
import cartDB from '../../../actions/shoppingCart/cartDB.js'
import { useEffect } from 'react'

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
  },
})

function Payments() {
  const classes = useStyle()
  const dispatch = useDispatch()
  const userLogged = useSelector((state) => state.userLogged)
  useEffect(() => {
    if (!userLogged) {
      dispatch(getLS())
    } else {
      dispatch(cartDB(userLogged))
    }
  }, [dispatch])

  return (
    <div className={classes.pay}>
      {userLogged ? (
        <>
          <Stripe />
          <MercadoPago />
          <MetaMask />
        </>
      ) : (
        <Button small variant='contained' color='primary' href='/login'>
          Please log in to make the purchase
        </Button>
      )}
    </div>
  )
}

export default Payments
