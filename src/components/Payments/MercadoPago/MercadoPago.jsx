import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TransactionMercadoPago } from "../../../actions/TransactionMercadoPago";

function MercadoPago() {

    const dispatch = useDispatch();
    const purchaseOrder = useSelector((state) => state.shoppingTrolley);
    console.log('purchaseOrder: ', purchaseOrder);

    return (
            <div>
                <button className="button" onClick={() => dispatch(TransactionMercadoPago(purchaseOrder))}>
                    Mercado Pago
                </button>
            </div>
    )
}

export default MercadoPago;