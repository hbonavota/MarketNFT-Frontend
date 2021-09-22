import { SHOPPING_CART_PAYMENT } from "./constants";

export default function ShoppingCartPayment(products) {
    return async function (dispatch) {
      try {
        console.log('Productos ShoppingPayment: ', products);
         return dispatch({
            type: SHOPPING_CART_PAYMENT,
            payload: products,
          });
        } catch (error) {
          console.log(error);
        }
      };
 }