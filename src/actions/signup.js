import axios from "../services/axios";
import { SIGNUP_SUCCESS } from "./constants";

export default function localSignup(payload) {
  return async function (dispatch) {
    return await axios()
      .post('/register', payload)
      .then((data) => {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: data.data,
        });
      });
  };
}
