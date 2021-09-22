import axios from "axios";

export default function removeFav(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.post("/deleteFav/", payload);
      console.log(response, "delete");
      return dispatch({
        type: "DELETE_FAV",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
