import axios from 'axios'
export default function logout(payload) {
  axios.post('https://nft-e-commerce11.herokuapp.com/logout', payload)
  return {
    type: 'LOGOUT',
  }
}

