import axios from "axios";
import { TRANSACTION_METAMASK } from "./constants";

export function TransactionMetaMask(eth) {
    return async function(dispatch) {
         try {

           const response = await axios.post(`https://nft-e-commerce11.herokuapp.com/transaction`, eth)
           console.log("Action Transaction Metamask:",response.data)
            return dispatch({type: TRANSACTION_METAMASK, payload: response.data})

         } catch(error) {
            console.log(error)
         }
    }
}