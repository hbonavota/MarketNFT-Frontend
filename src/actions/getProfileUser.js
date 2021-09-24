import axios from "axios";
import { GET_PROFILE_USER } from "./constants";


export default function getProfileUser(token) {
    return async function(dispatch) {
         try {

           const response = await axios.get(`/profile/${token}`)

           console.log("Action GET_PROFILE_USER: ",response.data)

            return dispatch({type: GET_PROFILE_USER, payload: response.data})

         } catch(error) {
            console.log(error)
         }
    }
}