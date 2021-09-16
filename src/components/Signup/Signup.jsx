import NavBar from '../NavBar/NavBar'
import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import localSignup from '../../actions/signup'

export default function Signup({
  invalidEmail,
  invalidPassword,
  handleChange,
  handleSubmit,
}) {
  const [inputs, setInputs] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
  })

  return (
    <div className='App'>
      <NavBar />
      <header className='App-header'>
        <form
          action=''
          noValidate
          autoComplete='off'
          onSubmit={(e) => handleSubmit(e, localSignup, inputs)}
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
              id='firstName'
              name='firstName'
              label='First name'
              value={inputs.firstName}
              variant='outlined'
            />
          </div>
          <div>
            <TextField
              onChange={(e) => handleChange(e, inputs, setInputs)}
              id='lastName'
              name='lastName'
              label='lastName'
              value={inputs.lastName}
              variant='outlined'
              type='text'
            />
          </div>
          <div>
            <TextField
              onChange={(e) => handleChange(e, inputs, setInputs)}
              error={inputs.password && invalidPassword(inputs.password)}
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
              type='submit'
              disabled={!inputs.firstName && !inputs.email && !inputs.password}
            >
              Sign up
            </Button>
          </div>
        </form>

        <Button className='LoginDiv' variant='contained' color='secondary'>
          <a href='http://localhost:8001/auth/google'>Sign up with Google</a>
        </Button>
      </header>
    </div>
  )
}
