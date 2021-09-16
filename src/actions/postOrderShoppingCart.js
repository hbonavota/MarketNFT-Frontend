import axios from "axios";
import { POST_ORDER_SHOPPING_CART } from "./constants";

export function postOrderShoppingCart(order) {
    return async function(dispatch) {
         try {

           const response = await axios.post(`https://nft-e-commerce11.herokuapp.com/orderCart`, order)
           console.log("Action POST_ORDER_SHOPPING_CART:",response.data)
            return dispatch({type: POST_ORDER_SHOPPING_CART, payload: response.data})

         } catch(error) {
            console.log(error)
         }
    }
}