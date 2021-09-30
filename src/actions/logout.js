import axios from 'axios'
export default function logout(payload) {
  axios.post('/logout', {token : payload})
  return {
    type: 'LOGOUT',
  }
}

