import { CONECT_LS } from "./constants";

export function getLS() {
  return function (dispatch) {
    try {
      return dispatch({
        type: CONECT_LS,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

