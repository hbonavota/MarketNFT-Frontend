import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postOrderShoppingCart } from "../../actions/postOrderShoppingCart";

function OrderShoppingCart() {
  const purchaseOrder = useSelector((state) => state.shoppingTrolley);
  const dispatch = useDispatch();

  const handleSubmit = async function (e) {
      console.log("hice click para enviar la orden")
    e.preventDefault();
    const orderSubmit = {
        items: purchaseOrder
    }
    dispatch(postOrderShoppingCart(orderSubmit));
  };

  return (

        <div >
            <button type="submit" onClick={(e) => handleSubmit(e)}>
                Enviar Orden
            </button>
        </div>

  );
}

export default OrderShoppingCart;