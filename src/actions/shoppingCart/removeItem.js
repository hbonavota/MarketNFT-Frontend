import axios from "axios";

export default function removeItem(payload) {
    return async function (dispatch) {
      try {
        let response = await axios.post("/deleteItem/",payload);
         return dispatch({
            type: "DB_SHOPPING_CART",
            payload: response.data,
          });
        } catch (error) {
          console.log(error);
        }
      };
 }
 