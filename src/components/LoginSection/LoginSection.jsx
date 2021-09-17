import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'

export default function LoginSection() {
  const [signup, setSignup] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const validateEmail = (input) => !/\S+@\S+\.\S+/.test(input)
  const validatePassword = (input) => !/(?=.*[0-9])/.test(input)

  function handleChange(event, state, setState) {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  function handleSubmit(event, action, state) {
    event.preventDefault()
    dispatch(action(state))
    console.log('funciona el handleSubmit')
    history.push('/')
  }

  return (
    <div>
      {signup ? (
        <Signup
          invalidEmail={validateEmail}
          handleChange={handleChange}
          invalidPassword={validatePassword}
          handleSubmit={handleSubmit}
          buttonchange={ <Button
            onClick={() => setSignup(!signup)}
            variant='outlined'
            color='primary'
          >
            {signup ? 'I already have an account' : "I don't have an account"}
          </Button> }
        />
      ) : (
        <Login
          invalidEmail={validateEmail}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonchange={ <Button
            onClick={() => setSignup(!signup)}
            variant='outlined'
            color='primary'
          >
            {signup ? 'I already have an account' : "I don't have an account"}
          </Button> }
        />
      )}
    </div>
  )
}
