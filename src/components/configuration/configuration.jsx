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

                    <Typography  variant='h4'>Your artist name</Typography>
                    <input type="text" name="artist"  onChange={(e) => onInputChange(e)}/>

                    <Typography  variant='h4'>Your profile pic</Typography>
                    <input name="profilePic" src="" alt="" onChange={(e) => onInputChange(e)}/>

                    <Typography  variant='h4'>Your description</Typography>
                    <input type="text" name="description" onChange={(e) => onInputChange(e)}/>

                    <Typography  variant='h4'>Your address</Typography>
                    <input type="text" name="address" onChange={(e) => onInputChange(e)}/>

                    <Button
                      size='large'
                      color='primary'
                      variant='contained'
                      type='submit'
                    >
                     Update profile
                    </Button>

          </Box>
          </Grid>
        </Grid>

  )
}