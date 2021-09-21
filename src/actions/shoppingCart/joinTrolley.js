import axios from "axios";

export default function joinTrolley(payload) {
    return async function (dispatch) {
      try {
        let response = await axios.post("/joinShoppingCart/",payload);
        return dispatch({
            type: "JOIN_SHOPPING_CART",
            payload: response.data,
          });
        } catch (error) {
          console.log(error);
        }
      };
 }
 