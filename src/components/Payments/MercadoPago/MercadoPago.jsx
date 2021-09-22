  
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core'
import {getLS} from '../../../actions/getLS'
import { makeStyles } from '@material-ui/core/styles'
import cartDB from '../../../actions/shoppingCart/cartDB.js'
import axios from 'axios';

const useStyle = makeStyles({
    button: {
      margin: '5px',
    }
  })
  

function MercadoPago() {    
    const classes = useStyle()
    const dispatch = useDispatch();
    const userLogged= useSelector((state) => state.userLogged);
    const purchaseOrder = useSelector((state) => state.shoppingCartPayment);
    useEffect(() => {
        if(!userLogged){
            dispatch(getLS())
        }else{            
            dispatch (cartDB(userLogged))
        }
    
    }, [dispatch])
    console.log('purchaseOrder MercadoPagoFront: ', purchaseOrder);

    const CheckOutMP = async function Redirect(pesos){
      const response  = await axios.post(`http://localhost:8001/MercadoPagoTransaction`, pesos)
      console.log('response: MP: ',response.data);
      window.location.href = response.data;
    }

    return (
            <div>
                <Button className={classes.button} onClick={() => CheckOutMP(purchaseOrder)}
                    color='primary' variant='contained'> Mp
                </Button>
            </div>
    )
}

export default MercadoPago;