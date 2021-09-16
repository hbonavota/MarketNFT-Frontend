import NavBar from '../NavBar/NavBar'
import './Login.module.css'
import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import localLogin from '../../actions/login'



export default function Login({ invalidEmail, handleChange, handleSubmit }) {
  const [inputs, setInputs] = useState({ username: '', password: '' })


  return (
    <div className='App'>
      <NavBar />
      <header className='App-header'>
        <h1>Login</h1>
        <form
          action=''
          noValidate
          autoComplete='off'
          onSubmit={(e) => handleSubmit(e, localLogin, inputs)}
        >
          <div>
            <TextField
              onChange={(e) => handleChange(e, inputs, setInputs)}
              error={inputs.username && invalidEmail(inputs.username)}
              id='username'
              name='username'
              label='E-mail'
              value={inputs.username}
              variant='outlined'
            />
          </div>
          <div>
            <TextField
              onChange={(e) => handleChange(e, inputs, setInputs)}
              id='password'
              name='password'
              label='Password'
              value={inputs.password}
              variant='outlined'
              type='password'
            />
          </div>

          <div>
            <Button
              variant='contained'
              color='primary'
              disabled={
                invalidEmail(inputs.username) && !inputs.password.length
              }
              type='submit'
            >
              Login
            </Button>
          </div>
        </form>

        <Button className='LoginDiv' variant='contained' color='secondary'>
          <a href='https://nft-e-commerce11.herokuapp.com/auth/google'>Log in with Google</a>
        </Button>
      </header>
    </div>
  )
}
