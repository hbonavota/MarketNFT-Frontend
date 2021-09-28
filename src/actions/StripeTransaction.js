import axios from "axios";
import { TRANSACTION_STRIPE } from "./constants";

export function TransactionStripe(amount) {
    return async function(dispatch) {
         try {

            const response = await axios.post(`/transactionStripe`, amount)
            return dispatch({type: TRANSACTION_STRIPE, payload: response.data})

         } catch(error) {
            console.log(error)
         }
    }
}