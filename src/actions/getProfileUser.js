import axios from "axios";
import { GET_PROFILE_USER } from "./constants";

export default function getProfileUser() {
   return async function (dispatch) {
      try {
         const response = await axios.get(`https://nft-e-commerce11.herokuapp.com/profile`)
         return dispatch({ type: GET_PROFILE_USER, payload: response.data })
      } catch (error) {
         console.log(error)
      }
   }
}