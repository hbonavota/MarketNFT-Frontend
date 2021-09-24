import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import postCategorie from "../../actions/admin/postCategorie"
import { getCategories } from '../../actions/getCategories'
import { deleteCategory } from '../../actions/admin/deleteCategory'
import { Link } from 'react-router-dom'
import { Button, Grid } from '@material-ui/core'
import {Paper, Typography } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";
import Footer from '../footer/footer'
/* import { Box } from '@mui/material'; */
/* import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'; */

const useStyles = makeStyles({
  maincontainer: {
      marginTop: "100px",
      maxWidth: "500px",
      height: "50vh"
  },
  root: {
      // marginTop: "100px"
  },
  button: {
    
  }
  })

export default function AdminCategories() {
  const classes = useStyles()
  const dispatch = useDispatch();
  const categoriesDB = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const [inputs, setInputs] = useState({
    nameCategory: "",
    deleteCategory: "",
  })
  

  function onInputChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  }


  async function handleSubmit(e) {
    e.preventDefault()
    const category = { name: inputs.nameCategory }
    dispatch(postCategorie(category))
    alert('Category created')
    dispatch(getCategories())
    setInputs({ nameCategory: "" })

  }
  async function handleDelete(e) {
    e.preventDefault()
    dispatch(deleteCategory(inputs.deleteCategory))
    alert('Category deleted')
    dispatch(getCategories())
    setInputs({ deleteCategory: "" })

  }


  return (
    <div>
    <Grid justifyContent="center" container className={classes.root}> 
    <Grid component={Paper} spacing={2} elevation={5} alignItems="center" direction="column" container className={classes.maincontainer}>
    <div>
      <Link to='/admin'>
        <Button variant='contained' color="primary" size='large'>Back</Button>
      </Link>
      <h3>Modify categories </h3>
      <h4>Add</h4>
      <label>Name</label>
      <input
        className="input1"
        required
        type="text"
        name="nameCategory"
        placeholder="New category"
        value={inputs.nameCategory}
        onChange={(e) => onInputChange(e)}
      />
      <Button className={classes.button} variant='contained' color="primary" size='large' onClick={handleSubmit}>Create!</Button>

      <form onSubmit={(e) => handleDelete(e)}>
        <h4>Delete</h4>
        <label htmlFor="">Categories</label>
        <select className="input" required name="deleteCategory" onChange={(e) => onInputChange(e)} defaultValue="">
          <option value="">Choose categories</option>
          {categoriesDB.map((cat) => (
            <option key={cat._id} name={cat.name} value={cat._id}>{cat.name?.charAt(0).toUpperCase() + cat.name?.slice(1)}</option>
          ))}
        </select>
        <Button variant='contained' color="primary" size='large' type="submit">Delete!</Button>
      </form>
      {/* <Box sx={{ maxWidth: 320 }}>
        <FormControl  onSubmit={(e) => handleDelete(e)} fullWidth>
          <InputLabel id="demo-simple-select-label">Choose categories</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={inputs.deleteCategory}
            label="Choose categories"
             onChange={(e) => onInputChange(e)}
          >
            {categoriesDB.map((cat) => (
              <MenuItem onChange={(e) => onInputChange(e)} key={cat._id} name={cat.name} value={cat._id}>{cat.name?.charAt(0).toUpperCase() + cat.name?.slice(1)}</MenuItem>
          ))}
          </Select>
          <Button variant='contained' size='large' type="submit">Delete!</Button>
        </FormControl>
      </Box> */}
    </div>
    </Grid>
    </Grid>
    <Footer></Footer>
    </div>
  )
}
