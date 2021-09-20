import './Login.css'
import React, { useState } from 'react'
import { TextField, Button, Grid, Container, Paper, Avatar, Typography } from '@material-ui/core'
import localLogin from '../../actions/login'
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundPosition: "center"
  },
  container: {
    height: "60%",
    marginTop: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(-5),
      width: "100%",
      height: "100%"
    }
  },
  center: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    maxHeight: "33px",
    marginRight: "100px",
  }
  
}));


export default function Login({ invalidEmail, handleChange, handleSubmit, buttonchange }) {
  const classes = useStyles();
  const myStorage = window.localStorage
  let cart= JSON.parse(myStorage.getItem('user'))
  
  const [inputs, setInputs] = useState({ username: '', password: '', cart:cart })
  return (
     <Grid component="main" className={classes.root}> 
      <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
        <div className={classes.center}>
          <Avatar className={classes.avatar}>
        <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">Login</Typography>
        <form
          action=''
          noValidate
          autoComplete='off'
          onSubmit={(e) => handleSubmit(e, localLogin, inputs)}
        >
            <TextField
              onChange={(e) => handleChange(e, inputs, setInputs)}
              error={inputs.username && invalidEmail(inputs.username)}
              id='username'
              name='username'
              label='E-mail'
              value={inputs.username}
              variant='outlined'
              fullWidth
              autoFocus
              margin="normal"
            />
          
            <TextField
              onChange={(e) => handleChange(e, inputs, setInputs)}
              id='password'
              name='password'
              label='Password'
              value={inputs.password}
              variant='outlined'
              type='password'
              fullWidth
              autoFocus
              margin="normal"
            />

            <Button
              variant='contained'
              className={classes.button}
              color='primary'
              disabled={
                invalidEmail(inputs.username) && !inputs.password.length
              }
              type='submit'
            >
              Login
            </Button>
            {buttonchange }
        </form>
    <div id="SignInWrapper">
    <span className="label">Login with  </span>
    <div id="customBtn" className="customGPlusSignIn">
      <span className="icon"></span>
      <span className="buttonText"><a style={{textDecoration: "none"}} href='https://nft-e-commerce11.herokuapp.com/auth/google'>Google</a></span>
    </div>
  </div>
        </div>
        </Container>
      </Grid>
  )
}
