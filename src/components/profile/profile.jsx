import './profile.css';
import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from '../Sidebar/sidebar.jsx'
import getProfileUser from '../../actions/getProfileUser';
import { useDispatch, useSelector } from 'react-redux'


const useStyle = makeStyles({
  contentSection: {
    display: 'flex',
    marginTop: '20px',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.16), 0 1px 4px rgba(0,0,0,0.23)',
  },
  link: {
    textDecoration: 'none',
  },
  gridBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
    flexWrap: "wrap",
    marginTop: "10px"
  },
  title: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    marginTop: "10px",
    marginBottom: "20px",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    boxShadow: "0px 1px 7px rgb(0 0 0 / 10%)",
    width: "350px",
    padding: "15px",
    margin: "10px",
    borderRadius: "20px",
    flexWrap: "wrap",
    cursor: "pointer",
  },
  img: {
    width: "300px",
    marginBottom: "5px",
  },
  description: {
    width: "350px",
  }
 })

export default function Profile() {

  
  const classes = useStyle()
  const token = useSelector((state) => state.userLogged)
  useEffect(() => {
    dispatch(getProfileUser(token))
  },[])
    const userData = useSelector((state)=> state.profileUserData)
    const allNfts= useSelector((state)=> state.allNFTs)
    const publicationsInFeed = allNfts.filter(nft=> nft.address === userData.address)
    const dispatch = useDispatch();

   
  return (

      <Grid container>
          <Grid >
            <Sidebar item xs={12} sm={12} md={3} lg={3} xl={3}/>
          </Grid>
          <Grid className={classes.contentSection} item xs={12} sm={12} md={9} lg={9} xl={9}>
          <Grid className={classes.title}>
            <Typography  variant='h4'>¡Welcome {userData?.firstName}! </Typography>
            <Typography  variant='h5'>Your NFTs created.</Typography>

          </Grid>
            <Grid className={classes.gridBox}>
              {publicationsInFeed.map(nft=> (
                <Box className={classes.card} xs={12} sm={12} md={3} lg={3} xl={3}>
                  <Typography  variant='h5'>{nft.name}</Typography>
                  <img className={classes.img} src={nft.image}></img>
                  <Typography className={classes.description} variant='subtitle1'> {nft.description}</Typography>
                </Box>
                )
              )}
            </Grid>

          </Grid>
        </Grid>

  )
}