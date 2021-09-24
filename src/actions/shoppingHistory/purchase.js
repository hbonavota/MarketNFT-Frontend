import axios from "axios";

export default function purchase(payload) {
    return async function (dispatch) {
      try {
        let response = await axios.post("/newPurchase",payload);
        return dispatch({
            type: "SUCCESS_PURCHASE",
            payload: response.data,
          });
        } catch (error) {
          console.log(error);
        }
      };
 }