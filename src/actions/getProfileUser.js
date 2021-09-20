import axios from "axios";
import { GET_PROFILE_USER } from "./constants";


export default function getProfileUser() {
    return async function(dispatch) {
         try {

           const response = await axios.get(`http://localhost:8001/profile`)

           console.log("Action GET_PROFILE_USER: ",response.data)

            return dispatch({type: GET_PROFILE_USER, payload: response.data})

         } catch(error) {
            console.log(error)
         }
    }
}