import axios from "axios";


export function verifyAdmin(token) {
  return async function (dispatch) {
    try {
      const verify = await axios.post('/admin/verify',token);
            // return dispatch({
            //         type: "VERIFY",
            //         payload: verify.data
            //     })            
               
    } catch (error) {
      console.log(error);
    }
  };
};
