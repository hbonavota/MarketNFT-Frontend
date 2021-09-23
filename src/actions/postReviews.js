import axios from 'axios'
import { POST_REVIEW } from './constants'

export default function postReview(review) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/profile/review`, review)

      console.log('Action POST_REVIEW: ', response.data)

      dispatch({ type: POST_REVIEW, payload: response.data })
    } catch (error) {
      console.log(error)
    }
  }
}
