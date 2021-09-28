import axios from "axios";
import { TRANSACTION_METAMASK } from "./constants";

export function TransactionMetaMask(eth) {
    return async function(dispatch) {
         try {

           const response = await axios.post(`/transactionMetamask`, eth)
            return dispatch({type: TRANSACTION_METAMASK, payload: response.data})

         } catch(error) {
            console.log(error)
         }
    }
}