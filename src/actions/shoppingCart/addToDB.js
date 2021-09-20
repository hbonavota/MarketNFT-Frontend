import axios from "axios";

export default function addToDB(payload) {
    return async function (dispatch) {
      try {
        let response = await axios.post("https://nft-e-commerce11.herokuapp.com/userShoppingCart",payload);
         return dispatch({
            type: "DB_SHOPPING_CART",
            payload: response.data,
          });
        } catch (error) {
          console.log(error);
        }
      };
 }
 