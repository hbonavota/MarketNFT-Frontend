import axios from 'axios'
export default function logout(payload) {
  axios.post('http://localhost:8001/logout', payload)
  return {
    type: 'LOGOUT',
  }
}

