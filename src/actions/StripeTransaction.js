import axios from "axios";
import { TRANSACTION_STRIPE } from "./constants";

export function TransactionStripe(amount) {
    return async function(dispatch) {
         try {

            const response = await axios.post(`http://localhost:8001/transactionStripe`, amount)
            console.log("Action Transaction Metamask:",response.data)
            return dispatch({type: TRANSACTION_STRIPE, payload: response.data})

         } catch(error) {
            console.log(error)
         }
    }
}