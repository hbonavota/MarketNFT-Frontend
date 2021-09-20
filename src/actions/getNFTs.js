import axios from "axios";
import { GET_NFTs } from "./constants";

export const getNFTs = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get("http://localhost:8001/nfts");
      return dispatch({
        type: GET_NFTs,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
