
import React from 'react'
import style from '../Home/Home.module.css'
import CollectionHome from '../collectionhome/collectionhome.jsx'
import ImageSlider from '../slider/slider'
import Typography from '@mui/material/Typography';
import Grid from '@material-ui/core/Grid'
import SliderCategory from '../slider/slidercategory'

export default function Home() {

  return (
    <React.Fragment>
       <Grid container xs={12} spacing={6}>
        <div className={style.title}>
          <Typography variant="h4">Explore The NFTs Universe</Typography>
        </div>
        <CollectionHome/>
      </Grid>
      <div className={style.title2}>
      <Typography variant="h5">Keep Track of The New NFTs Releases</Typography>
      </div>
      <ImageSlider />
      <div className={style.title2}>
      <Typography variant="h5">Find Different Categories</Typography>
      </div>
      <SliderCategory></SliderCategory>
    </React.Fragment>
  )
}