import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNFTs } from '../../actions/getNFTs'
import { deleteNFT } from '../../actions/admin/deleteNFT'
import { Link } from 'react-router-dom'
import { Button, Grid } from '@material-ui/core'
import Footer from '../footer/footer'
import Search from '../Search/Search'
import { Card } from '@mui/material'
import { makeStyles } from "@material-ui/core";
import { minHeight } from '@mui/system'

const useStyles = makeStyles(theme => ({
 card: {
   margin: "15px",
   minHeight: "100px",
  
 },
 Button: {
   marginTop: "3rem",
   marginLeft: "3rem"
 }
  

}))

export default function Admi0Nfts() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const nfts = useSelector(state => state.allNFTs)

  useEffect(() => {
    dispatch(getNFTs())
  }, [dispatch])

  const [inputs, setInputs] = useState({
    deleteNFT: []
  })

  function onInputChange(e) {
    e.preventDefault()
    setInputs({
      ...inputs,
      [e.target.name]: inputs[e.target.name].concat(e.target.value)
    });

  }

  async function handleDeleteNFT(e) {
    e.preventDefault()
    dispatch(deleteNFT(inputs.deleteNFT))
    alert('NFT deleted')
    dispatch(getNFTs())
    setInputs({ deleteNFT: [''] })

  }


  return (<div>
    <Link to='/admin'>
      <Button className={classes.Button} color="primary" variant='contained' size='large'>Back</Button>
    </Link>
    <Search/>
    <form name="deleteNFT" onSubmit={(e) => handleDeleteNFT(e)}>
      <h2>Chose the NFTs and press Delete</h2>
      {/* <label htmlFor="">NFTs</label> */}
      <div>
      <Grid container spacing={6} justify="center" >
        {nfts.map((n) => (
          <Card key={n._id} className={classes.card}>
            <input
              type="checkbox"
              name="deleteNFT"
              value={n._id}
              onChange={(e) => onInputChange(e)}
            ></input>
            <div>
              <label name={n.name}> {n.name.slice(0,10)} </label>
              <img src={n.image} alt="NFT image" width="60" height="60" />
            </div>
          </Card>
        ))}</Grid>
      </div>
      <Button className={classes.Button} variant='contained' color="primary" size='large' type="submit">Delete!</Button>
    </form>
    <Footer></Footer>
  </div>
  )
}