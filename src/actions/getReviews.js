import axios from 'axios'

export default function getReviews() {
  return async function (dispatch) {
    try {
      let response = await axios.get('/review')
      return dispatch({
        type: 'GET_REVIEWS',
        payload: response.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
