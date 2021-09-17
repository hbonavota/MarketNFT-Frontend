import React, { useState } from 'react'
import { TextField, Button, Grid, Container, Paper, Avatar, Typography } from '@material-ui/core'
import localSignup from '../../actions/signup'
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import "../Login/Login.css"

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundPosition: "center"
  },
  container: {
    height: "85%",
    marginTop: theme.spacing(10)
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
    marginRight: "65px",
  }
  
}));


export default function Signup({
  invalidEmail,
  invalidPassword,
  handleChange,
  handleSubmit,
  buttonchange
}) {
  const [inputs, setInputs] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
  })
  const classes = useStyles();

  return (
    <Grid component="main" className={classes.root}> 
      <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
        <div className={classes.center}>
          <Avatar className={classes.avatar}>
        <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">Create Account</Typography>
        <form
          action=''
          noValidate
          autoComplete='off'
          onSubmit={(e) => handleSubmit(e, localSignup, inputs)}
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
              id='firstName'
              name='firstName'
              label='First name'
              value={inputs.firstName}
              variant='outlined'
              fullWidth
              autoFocus
              margin="normal"
            />
            <TextField
              onChange={(e) => handleChange(e, inputs, setInputs)}
              id='lastName'
              name='lastName'
              label='lastName'
              value={inputs.lastName}
              variant='outlined'
              type='text'
              fullWidth
              autoFocus
              margin="normal"
            />
            <TextField
              onChange={(e) => handleChange(e, inputs, setInputs)}
              error={inputs.password && invalidPassword(inputs.password)}
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
              color='primary'
              type='submit'
              className={classes.button}
              disabled={!inputs.firstName && !inputs.email && !inputs.password}
            >
              Sign up
            </Button>
            {buttonchange}

        </form>

       <div id="SignInWrapper">
    <span className="label">Sign up with  </span>
    <div id="customBtn" className="customGPlusSignIn">
      <span className="icon"></span>
      <span className="buttonText"><a style={{textDecoration: "none"}} href='http://localhost:8001/auth/google'>Google</a></span>
    </div>
  </div>
        </div>
      </Container>
    </Grid>
  )
}
