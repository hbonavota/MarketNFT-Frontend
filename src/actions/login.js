import loginUser from '../services/auth/loginUser'

export default function localLogin(payload) {
  return async function (dispatch) {
    const response = await loginUser(payload)
    if (response) {
      window.sessionStorage.setItem(
        'role',
        JSON.stringify(response[1])
      )
      window.sessionStorage.setItem(
        'userLogged',
        JSON.stringify(response[0].token)
      )
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response,
      })
    } else {
      dispatch({
        type: 'LOGIN_ERROR',
      })
    }
  }
}
