import axios from 'axios'
export default function logout(payload) {
  axios.post('/logout', payload)
  return {
    type: 'LOGOUT',
  }
}

