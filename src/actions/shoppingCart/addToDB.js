import axios from "axios";

export default function addToDB(payload) {
    return async function (dispatch) {
      try {
        let response = await axios.post("http://localhost:8001/userShoppingCart",payload);
         return dispatch({
            type: "DB_SHOPPING_CART",
            payload: response.data,
          });
        } catch (error) {
          console.log(error);
        }
      };
 }
 