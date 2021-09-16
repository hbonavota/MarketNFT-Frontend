import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderShoppingCart } from "../../actions/getOrderShoppingCart";
import { removeLS } from "../../actions/removeLS";
import { getLS } from "../../actions/getLS";
import ShoppingCart from '../shoppingCart/shoppingCart'
import Payments from '../Payments/PaymentsButton/PaymentsButton'
import getClean from "../../actions/getClean"
import { Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import './shoppingcart.css'

export default function NavBarShoppingCart() {
    const dispatch = useDispatch();
    /*     useEffect(() => {
            dispatch(getOrderShoppingCart())
         }, [dispatch]) */
    useEffect(() => {
        dispatch(getLS())
    }, [dispatch])

    const handleCartClick = function (e) {
        /*         dispatch(getOrderShoppingCart()) */
        dispatch(removeLS(e))
       /*  window.location.reload() */
    }

    const allProductsCart = useSelector(state => state.shoppingTrolley)

    return (
        <div>
            <ShoppingCart />


            <div className="divOrder">
                <h6>Nombre</h6>
                <h6>Dueño</h6>
                <h6>Producto</h6>
                <h6> Precio </h6>
                <h6>Eliminar</h6>
            </div>
            {
                allProductsCart?.map(e => (
                    <div className="divOrder">
                        <div className="divData">
                            <h5>{e ? e.name : null}</h5>
                        </div>
                        <div className="divData">
                            <h5>{e ? e.owner : null}</h5>
                        </div>
                        <div className="divData">
                            <img src={e ? e.image : null} width="80px" height="80px" />
                        </div>
                        <div className="divData">
                            <h4>{e ? e.price : null}</h4>
                        </div>
                        <div className="divData">
                            <Tooltip title="Delete">
                                <IconButton aria-label="delete">
                                <DeleteIcon
                                onClick={() => handleCartClick(e)}
                                />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                ))
            }
            <Payments />
        </div>
    )
}