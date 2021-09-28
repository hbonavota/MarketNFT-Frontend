import axios from "axios";
import { UPDATE_PROFILE } from "./constants";


export function updateProfileUser() {
   return async function (dispatch) {
      try {
         const response = await axios.put(`https://nft-e-commerce11.herokuapp.com/profile`)
         return dispatch({ type: UPDATE_PROFILE, payload: response.data })
      } catch (error) {
         console.log(error)
      }
   }
}