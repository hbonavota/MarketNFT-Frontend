import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Sidebar from '../Sidebar/sidebar.jsx'
import PutProfileUser from "../../actions/putProfileUser"
import getProfileUser from "../../actions/getProfileUser"

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
  img: {
    width: '200px',
    height: '200px',
    border: '1px solid rgb(133, 133, 133)',
    borderRadius: '100px',
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "400px",
    padding: "15px",
    boxShadow: "0px 1px 7px rgb(0 0 0 / 10%)",
    borderRadius: "20px",
  },
  button: {
    marginTop: "15px",
    width: "180px"
  },
 })
 
 export default function Configuration() {
   const classes = useStyle()
   const token = useSelector((state) => state.userLogged)
   const dispatch = useDispatch();
   
    const [profile, setProfile] = useState({
      artist: '',
      description: '',
      profilePic: '',
      address:''
   })
   
   
   function onInputChange(e) {
     setProfile({
       ...profile,
       [e.target.name]: e.target.value,
     })
   }
   
   
   async function handleSubmit(e) {
     e.preventDefault()
     dispatch(PutProfileUser(profile, token))
     alert('Profile actualized')
     setProfile({
       artist: '',
       description: '',
       profilePic: '',
       addres:''
      })
     dispatch(getProfileUser(token))
   }
   
  return (

      <Grid container>
          <Grid >
            <Sidebar item xs={12} sm={12} md={3} lg={3} xl={3}/>
          </Grid>
          <Grid className={classes.contentSection} item xs={12} sm={12} md={9} lg={9} xl={9}>

          <Box
            component='form'
            onSubmit={(e) => handleSubmit(e)}
          >
            <Box className={classes.box}>
            <Typography  variant='h4'>Edit your profile</Typography>
                    <Typography  variant='h6'>Artist name</Typography>
                    <input type="text" name="artist"  onChange={(e) => onInputChange(e)}/>

                    <Typography  variant='h6'>Image</Typography>
                    <input name="profilePic" src="" alt="" onChange={(e) => onInputChange(e)}/>

                    <Typography  variant='h6'>Description</Typography>
                    <input type="text" name="description" onChange={(e) => onInputChange(e)}/>

                    <Typography  variant='h6'>Wallet Address</Typography>
                    <input type="text" name="address" onChange={(e) => onInputChange(e)}/>

                    <Button className={classes.button}
                      size='large'
                      color='primary'
                      variant='contained'
                      type='submit'
                    >
                     Update profile
                    </Button>
            </Box>

          </Box>
          </Grid>
        </Grid>

  )
}