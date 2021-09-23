import axios from "axios";

export default function deleteFav(payload) {
  return async function (dispatch) {
    try {
      let rta = await axios.post("/deleteFavorites", payload);
      console.log(payload, "deleteFaav");
      return dispatch({
        type: "DELETE_FAV",
        payload: rta.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
