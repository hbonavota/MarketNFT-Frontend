import axios from "axios";
import { UPDATE_PROFILE } from "./constants";


export function updateProfileUser() {
    return async function(dispatch) {
         try {

           const response = await axios.put(`https://nft-e-commerce11.herokuapp.com/profile`)

           console.log("Action UPDATE_PROFILE: ",response.data)

            return dispatch({type: UPDATE_PROFILE, payload: response.data})

         } catch(error) {
            console.log(error)
         }
    }
}