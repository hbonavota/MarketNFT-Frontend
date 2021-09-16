import axios from "axios";


export function verifyAdmin(token) {
  return async function (dispatch) {
    try {
      const verify = await axios.post('https://nft-e-commerce11.herokuapp.com/admin/verify',token);
            // return dispatch({
            //         type: "VERIFY",
            //         payload: verify.data
            //     })            
               
    } catch (error) {
      console.log(error);
    }
  };
}
