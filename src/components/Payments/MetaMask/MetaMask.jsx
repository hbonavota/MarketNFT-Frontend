import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {getLS} from '../../../actions/getLS'
import cartDB from '../../../actions/shoppingCart/cartDB.js'
import  { useEffect } from 'react'
const Web3 = require('web3');
const web3 = new Web3(window.ethereum);

const useStyle = makeStyles({
  button: {
    margin: '5px',
  }
})


function PaymentMetaMask() {
  const classes = useStyle()
  const allProductsCart = useSelector(state => state.shoppingCartPayment)
  const userLogged= useSelector((state) => state.userLogged);
  const dispatch = useDispatch()

  useEffect(() => {
    if(!userLogged){
        dispatch(getLS())
    }else{
        
        dispatch (cartDB({user:userLogged}))
    }
  }, [dispatch])

    const dataMetaMask = []
    const pay = async function () {

      
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        let accounts = await web3.eth.getAccounts();
        let myAddress = accounts[0];
        dataMetaMask.push(myAddress)
      }

      for(let data of allProductsCart) {
        let transactionTo = data.ownerAddress;
        let moneyAmount = data.price;
        moneyAmount = moneyAmount * 1e18
        dataMetaMask.push(transactionTo)
        dataMetaMask.push(moneyAmount)
      }

    return web3.eth.sendTransaction({
      from: dataMetaMask[0],
      to: dataMetaMask[1],
      value: dataMetaMask[2],
    })
  } 

  const [metaMaskOption, setMetaMaskOption] = useState(true);

  return (
    <div>
            <Button className={classes.button} type="button" disabled={!userLogged} onClick={() => setMetaMaskOption(!metaMaskOption)} 
             color='primary' variant='contained'> {metaMaskOption ? 'Metamask' : 'Metamask'}
            </Button>

      {metaMaskOption ? (
        <div >

        </div>
      ) : (
            <Button onClick={() => dispatch(pay)}
                    color='primary'
                    variant='contained'>
                Enviar
            </Button>
      )}
  </div>
  );
}

export default PaymentMetaMask;