import React from 'react'
import style from '../Home/Home.module.css'
import CollectionHome from '../collectionhome/collectionhome.jsx'
import ImageSlider from '../slider/slider'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { AlertTitle, Alert } from '@mui/material'
import alert from '../../actions/alert'

export default function Home() {
  const alertGlobal = useSelector((state) => state.alert)
  const dispatch = useDispatch()

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
          <h1>Explore The NFTs Universe</h1>
        </div>
        <CollectionHome />
      </Grid>
      <div className={style.title2}>
        <h1>Keep Track of The New NFTs Releases</h1>
      </div>
      <ImageSlider />
    </React.Fragment>
  )
}
