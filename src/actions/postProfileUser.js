import axios from "axios";
import { POST_PROFILE_USER } from "./constants";

export function PostProfileUser(profile) {
    return async function(dispatch) {
         try {

           const response = await axios.post(`http://localhost:8001/profile`, profile)
           console.log("Action POST_PROFILE_USER: ",response.data)
            return dispatch({type: POST_PROFILE_USER, payload: response.data})

         } catch(error) {
            console.log(error)
         }
    }
}