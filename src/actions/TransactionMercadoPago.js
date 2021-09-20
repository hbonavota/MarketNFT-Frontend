import axios from "axios";
import { TRANSACTION_MERCADO_PAGO } from "./constants";

export function TransactionMercadoPago(pesos) {
    return async function(dispatch) {
         try {
            console.log('PESOS: ',pesos);
            const response = await axios.post(`https://nft-e-commerce11.herokuapp.com/MercadoPagoTransaction`, pesos)
            console.log("Action Transaction MercadoPago:")
            return dispatch({type: TRANSACTION_MERCADO_PAGO, payload: response.data})

         } catch(error) {
            console.log(error)
         }
    }
}