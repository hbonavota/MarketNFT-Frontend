import axios from "axios";
import { TRANSACTION_MERCADO_PAGO } from "./constants";

export function TransactionMercadoPago(pesos) {
    return async function(dispatch) {
         try {
            const response = await axios.post(`/MercadoPagoTransaction`, pesos)
            return dispatch({type: TRANSACTION_MERCADO_PAGO, payload: response.data})

         } catch(error) {
            console.log(error)
         }
    }
}