import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'

import alert from '../../actions/alert'
import { AlertTitle, Alert } from '@mui/material'
export default function LoginSection() {
  const [signup, setSignup] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const userLogged = useSelector((state) => state.userLogged)
  const alertGlobal = useSelector((state) => state.alert)

  const validateEmail = (input) => !/\S+@\S+\.\S+/.test(input)
  const validatePassword = (input) => !/(?=.*[0-9])/.test(input)

  function handleChange(event, state, setState) {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  function handleSubmit(event, action, state) {
    event.preventDefault()
    dispatch(action(state))

    if (!userLogged) {
      setTimeout(dispatch(alert(true)), 2000)
    } else {
      dispatch(alert(false))
      history.push('/')
    }
  }

  return (
    <div>
      {alertGlobal && (
        <Alert severity='error' onClose={() => dispatch(alert(false))}>
          <AlertTitle>Error</AlertTitle>
          An error has occurred. <strong>Please try again</strong>
        </Alert>
      )}
      {signup ? (
        <Signup
          invalidEmail={validateEmail}
          handleChange={handleChange}
          invalidPassword={validatePassword}
          handleSubmit={handleSubmit}
          buttonchange={
            <Button
              onClick={() => setSignup(!signup)}
              variant='outlined'
              color='primary'
            >
              {signup ? 'I already have an account' : "I don't have an account"}
            </Button>
          }
        />
      ) : (
        <Login
          invalidEmail={validateEmail}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonchange={
            <Button
              onClick={() => setSignup(!signup)}
              variant='outlined'
              color='primary'
            >
              {signup ? 'I already have an account' : "I don't have an account"}
            </Button>
          }
        />
      )}
    </div>
  )
}
