import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import getProfileUser from "../../actions/getProfileUser"
import getClean from "../../actions/getClean"
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyle = makeStyles({
    infoProfile: {
      display: 'flex',
      flexDirection: 'column',
      margin: '20px 10px 20px 20px',
      borderRight: '2px solid rgba(224,224,224,224.76)',
      backgroundColor: 'white',
      borderRadius: '15px',
      paddingLeft: '15px',
    },
    img: {
      width: '200px',
      height: '200px',
      border: '1px solid rgb(133, 133, 133)',
      borderRadius: '100px',
    },
    description: {
        padding: '3px',
    },
    button: {
      borderRadius: '5px',
      marginBottom: '5px',
      marginRight: '10px',
      fontFamily: 'Raleway',
      fontSize: '14px',
      textTransform: 'none',
      height: '32px',
      color: 'white',
    },
    blue: {
      borderRadius: '5px',
      marginBottom: '5px',
      marginRight: '10px',
      fontFamily: 'Raleway',
      fontSize: '14px',
      textTransform: 'none',
      height: '32px',
      color: 'white',
      background: 'rgba(36, 65, 228, 0.918)',
      '&:hover': {
        backgroundColor: 'rgb(27, 56, 219)',
        boxShadow: 'none',
      },
    },
    link: {
      textDecoration: 'none',
    }

   })



export default function Profile() {
  const classes = useStyle()
    const Web3 = require('web3');
    const web3 = new Web3(window.ethereum);
    const { id } = useParams();
    console.log("id desde useParams en profile", id)
    const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProfileUser())
    return () => {
      dispatch(getClean())
    }
  }, [dispatch])
  
  
  const getProfile = useSelector((state) => state.profileUserData)
  console.log("Información del perfil desded el Reducer:", getProfile[0])


  const connect = async function () {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else {
      alert(' Please Install Metamask')
      window.open(
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
        '_blank'
      )
    }
  }
   
  return (
      <Grid container>
          <Grid className={classes.infoProfile}>
              <h1>{getProfile[0]?.name}</h1>
              
              <img className={classes.img} src={getProfile[0]? getProfile[0].image : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/1024px-Imagen_no_disponible.svg.png"} alt="Not Found" />
              <Typography className={classes.description} variant='subtitle1'>{getProfile[0]?.description}</Typography>
              <hr />
              <Link className={classes.link} to='/profile/history'>
                  <Button className={classes.button} size="small" color="primary" variant="contained">Shopping History</Button>
              </Link>
              <Link className={classes.link} to='/profile/reviews'>
                  <Button className={classes.button} size="small" color="primary" variant="contained">Reviews</Button>
              </Link>
              <Link className={classes.link} to='/profile/createNFT'>
                  <Button className={classes.button} size="small" color="primary" variant="contained">Publish a new NFT</Button >
              </Link>
              <Link className={classes.link} to='/profile/configuration'>
                  <Button className={classes.button} size="small" color="primary" variant="contained">Configuration</Button>
              </Link>
          
            <div>
              <Button className={classes.blue}  variant="contained" id='connect' onClick={connect}>
                Connect your MetaMask account
              </Button>
            </div>
              <br /> 
              <br /> 
          </Grid>
        </Grid>
  )
}