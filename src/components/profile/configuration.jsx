import './profile.css';
import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Sidebar from '../Sidebar/sidebar.jsx'

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

export default function ConfigurationProfile() {
  const classes = useStyle()
    const dispatch = useDispatch();
  
   
  return (

      <Grid container>
          <Grid >
            <Sidebar item xs={12} sm={12} md={3} lg={3} xl={3}/>
          </Grid>
          <Grid className={classes.contentSection} item xs={12} sm={12} md={9} lg={9} xl={9}>
            <Typography  variant='h4'>Your artist name</Typography>
            <input type="text" />
            <img clasName={classes.img} src="" alt="" />
            <Typography  variant='h4'>Your description</Typography>
            <input type="text" />
          </Grid>
        </Grid>

  )
}