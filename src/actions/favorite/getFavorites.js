import axios from "axios";

export default function getFav(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.post("/dbfavorites/", payload);
      return dispatch({
        type: "GET_FAVORITES",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
