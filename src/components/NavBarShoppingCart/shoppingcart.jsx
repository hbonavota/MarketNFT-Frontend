import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeLS } from '../../actions/removeLS'
import { getLS } from '../../actions/getLS'
import Payments from '../Payments/PaymentsButton/PaymentsButton'
import { IconButton, Grid } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import cartDB from '../../actions/shoppingCart/cartDB.js'
import { getNFTs } from '../../actions/getNFTs'
import removeItem from '../../actions/shoppingCart/removeItem'
import ShoppingCartPayment from '../../actions/ShoppingCartPayment'
import { alertDeleted } from '../../actions/sweetAlert/alerts'
import joinTrolley from '../../actions/shoppingCart/joinTrolley'
import { identifyById } from '../../actions/functionIdentifyId'
import Cookies from 'js-cookie'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { Button } from '@material-ui/core'

const useStyle = makeStyles({
  div: {
    display: 'flex',
    flexDirection: 'row',
  },
  titles: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    background: 'white',
    borderRadius: '10px',
  },
  cart: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    background: 'white',
    borderRadius: '10px',
  },
  data: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px',
    padding: 5,
    background: 'white',
    borderRadius: '10px',
  },
})

export default function NavBarShoppingCart() {
  var NftShoppingCart = []
  const classes = useStyle()
  const dispatch = useDispatch()
  const userLogged = Cookies.get('token')
  let carrito = JSON.parse(window.localStorage.getItem('user'))

  useEffect(() => {
    if (!userLogged) {
      dispatch(getLS())
      dispatch(getNFTs())
    } else {
      dispatch(cartDB({ user: userLogged }))
      dispatch(getNFTs())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(ShoppingCartPayment(NftShoppingCart))
  }, [dispatch, NftShoppingCart])

  const allNfts = useSelector((state) => state.allNFTs)
  const allProductsCart = useSelector((state) => state.shoppingTrolley)
  const nftsData = identifyById(allNfts, allProductsCart)
  NftShoppingCart = nftsData

  if (userLogged && carrito) {
    dispatch(joinTrolley({ user: userLogged, cart: carrito })).then((e) => {
      carrito = window.localStorage.removeItem('user')
    })
  }

  const handleCartClick = function (e) {
    if (!userLogged) {
      dispatch(removeLS(e))
      alertDeleted()
    } else {
      dispatch(removeItem({ user: userLogged, item: e }))
    }
  }

  return (
    <div className={classes.div}>
      <Grid container>
        <Grid
          className={classes.titles}
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
          xl={8}
        >
          <Grid
            className={classes.data}
            marginLeft='20px'
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Grid item xs={0} sm={0} md={3} lg={3} xl={3} className='content'>
              <Typography color='white' variant='h6'>
                Name
              </Typography>
            </Grid>

            <Grid item xs={0} sm={0} md={3} lg={3} xl={3} className='content'>
              <Typography color='white' variant='h6'>
                Owner
              </Typography>
            </Grid>

            <Grid item xs={4} sm={0} md={4} lg={3} xl={3} className='content'>
              <Typography color='white' variant='h6'>
                Product
              </Typography>
            </Grid>

            <Grid item xs={4} sm={0} md={1} lg={3} xl={3} className='content'>
              <Typography color='white' variant='h6'>
                Price
              </Typography>
            </Grid>

            <Grid item xs={4} sm={0} md={1} lg={3} xl={3} className='content'>
              <Typography color='white' variant='h6'>
                Delete
              </Typography>
            </Grid>
          </Grid>
          {nftsData?.map((e) => (
            <Grid
              className={classes.data}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Grid item xs={0} sm={3} md={3} lg={3} xl={3} className='content'>
                <Typography variant='subtitle1'>{e ? e.name : null}</Typography>
              </Grid>

              <Grid item xs={0} sm={3} md={3} lg={3} xl={3} className='content'>
                <Typography variant='subtitle1'>
                  {e ? e.owner : null}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={3} md={3} lg={3} xl={3} className='content'>
                <img src={e ? e.image : null} width='75px' height='75px' />
              </Grid>

              <Grid item xs={3} sm={2} md={3} lg={3} xl={3} className='content'>
                <Typography variant='subtitle1'>
                  {e ? e.price : null}
                </Typography>
              </Grid>

              <Grid item xs={3} sm={2} md={3} lg={3} xl={3} className='content'>
                <IconButton aria-label='delete'>
                  <DeleteIcon onClick={() => handleCartClick(e._id)} />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Grid>
        {!userLogged ? (
         <Stack sx={{ width: "100%" }} spacing={2}>
         <Alert severity="info">
           If you want to buy any NFTs, please login with your account,
           thanks!
           {
             <Button color="inherit" size="small" href="/login">
               LOGIN
             </Button>
           }
         </Alert>
       </Stack>
        ) : (
          <Grid
            className={classes.cart}
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            xl={3}
          >
            <Payments />
          </Grid>
        )}
      </Grid>
    </div>
  )
}
