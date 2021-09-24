import React from 'react'
import style from '../Home/Home.module.css'
import CollectionHome from '../collectionhome/collectionhome.jsx'
import ImageSlider from '../slider/slider'
import Typography from '@mui/material/Typography';
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { AlertTitle, Alert } from '@mui/material'
import alert from '../../actions/alert'
import SliderCategory from '../slider/slidercategory'
import Footer from '../footer/footer';
import nftSold from '../../actions/shoppingHistory/nftSold';
import purchase from '../../actions/shoppingHistory/purchase';


export default function Home() {
  const alertGlobal = useSelector((state) => state.alert)
  const dispatch = useDispatch()
  const userLogged= useSelector((state) => state.userLogged);
  const cart = useSelector((state) => state.shoppingTrolley);

  if (cart.length > 0 && window.location.href.includes('collection_status=approved')){
    dispatch(purchase({user:userLogged,cart:cart}))
    dispatch(nftSold(cart))
    .then((e)=>{
    window.location.href="http://localhost:3000/"
    }) 
  }


  return (
    <React.Fragment>
      {alertGlobal && (
        <Alert severity='success' onClose={() => dispatch(alert(false))}>
          <AlertTitle>Goodbye</AlertTitle>
          You have successfully logged out. <strong>Come back soon!</strong>
        </Alert>
      )}
      <Grid container xs={12} spacing={6}>
        <div className={style.title}>
          <Typography variant="h4">Explore The NFTs Universe</Typography>
        </div>
        <CollectionHome />
      </Grid>
      <div className={style.title2}>

      <Typography variant="h5">Keep Track of The New NFTs Releases</Typography>

      </div>
      <ImageSlider />
      <div className={style.title2}>
      <Typography variant="h5">Find Different Categories</Typography>
      </div>
      <SliderCategory></SliderCategory>
      <Footer></Footer>
    </React.Fragment>
  )
}
