import axios from "axios";

export default function getShoppingHistoryDB(payload) {
    return async function (dispatch) {
      try {
        let response = await axios.post("//",payload);
        return dispatch({
            type: "DB_SHOPPING_HISTORY",
            payload: response.data,
          });
        } catch (error) {
          console.log(error);
        }
      };
 }
 