import axios from "axios";
import { GET_ORDER_SHOPPING_CART } from "./constants";

export function getOrderShoppingCart() {
    return async function(dispatch) {
         try {

           const response = await axios.get(`/orderCart`)
            return dispatch({type: GET_ORDER_SHOPPING_CART, payload: response.data})

         } catch(error) {
            console.log(error)
         }
    }
}