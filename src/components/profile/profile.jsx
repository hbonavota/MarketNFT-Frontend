import './profile.css';
import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core';
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
    const filter= allNfts.filter(nft=>nft.address===userData?.address)
    console.log(filter, 'filtrado')
    const dispatch = useDispatch();

   
  return (

      <Grid container>
          <Grid >
            <Sidebar item xs={12} sm={12} md={3} lg={3} xl={3}/>
          </Grid>
          <Grid className={classes.contentSection} item xs={12} sm={12} md={9} lg={9} xl={9}>
            <Typography  variant='h4'>¡ Welcome {userData?.firstName} !</Typography>
           
            {filter?.map(e=> (
              <Grid>
              <p>{e.name}</p>
              <img src={e.image}></img>
              </Grid>
              
              )

            )}
          </Grid>
        </Grid>

  )
}