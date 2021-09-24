import axios from "axios";

export default function nftSold(payload) {
    return async function (dispatch) {
      try {
        let response = await axios.post("/nftSold",payload);
        return dispatch({
            type: "UPDATE_NFTS",
            payload: response.data,
          });
        } catch (error) {
          console.log(error);
        }
      };
 }