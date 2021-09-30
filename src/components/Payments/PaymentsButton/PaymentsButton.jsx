import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MercadoPago from '../MercadoPago/MercadoPago'
import MetaMask from '../MetaMask/MetaMask'
import Stripe from '../Stripe/Stripe'
import { makeStyles } from '@material-ui/core/styles'
import { getLS } from '../../../actions/getLS'
import cartDB from '../../../actions/shoppingCart/cartDB.js'
import { Grid, Button } from '@material-ui/core'

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
    width: '30px',
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
    <Grid container direction="column">
    <Stripe />
    <MercadoPago />
    <MetaMask />
    </Grid>
  )
}

export default Payments
