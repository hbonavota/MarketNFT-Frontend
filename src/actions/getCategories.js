import axios from "axios";
import { GET_CATEGORIES } from "./constants";

export function getCategories() {
  return async function (dispatch) {
    try {
      let categories = await axios.get("http://localhost:8001/categories");
      return dispatch({
        type: GET_CATEGORIES,
        payload: categories.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

