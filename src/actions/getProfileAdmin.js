import axios from "axios";
import { GET_PROFILE_ADMIN } from "./constants";

export function getProfileAdmin(profile) {
    return async function(dispatch) {
         try {

           const response = await axios.get(`https://nft-e-commerce11.herokuapp.com/admin/profile`)
           console.log(response.data,"admin")
            return dispatch({type: GET_PROFILE_ADMIN, payload: response.data})

         } catch(error) {
            console.log(error)
         }
    }
}