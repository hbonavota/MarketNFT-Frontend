import axios from "axios";
import { PUT_PROFILE_USER } from "./constants";

export default function PutProfileUser(profile, token) {
    return async function(dispatch) {
         try {

           const response = await axios.put(`/profile/${token}`, profile)
            return dispatch({type: PUT_PROFILE_USER, payload: response.data})

         } catch(error) {
            console.log(error)
         }
    }
}