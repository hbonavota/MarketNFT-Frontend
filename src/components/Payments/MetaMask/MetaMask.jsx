import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './MetaMask.css'
import { TransactionMetaMask } from "../../../actions/MetaMaskTransaction";
const Web3 = require('web3');
const web3 = new Web3(window.ethereum);

function PaymentMetaMask() {
  const stateTransaction = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  console.log("State del reducer que trae la info de la transacción:", stateTransaction)

  const [myAddress, setMyAddress] = useState("");
  const [transactionTo, setTransactionTo] = useState("");
  const [moneyAmount, setMoneyAmount] = useState("");

  const handleClick = async function (e) {
    e.preventDefault();
    if (window.ethereum) {
      const eTargetName = e.target.name
      switch (eTargetName) {
        case 'myAddress':
          let accounts = await web3.eth.getAccounts();
          setMyAddress(e.target.value = accounts[0])
          console.log(e.target.value)
          break;

        default:
          break;
      }
    }
  }

  const handleInputChange = async function (e) {
    e.preventDefault();
    if (window.ethereum) {
      const eTargetName = e.target.name
      switch (eTargetName) {
        case 'transactionTo':
          if (!web3.utils.isAddress(e.target.value)) {
            return alert("Dirección inválida")
          }
          if (e.target.value.length > 39 && e.target.value.length <= 41) {
            return alert("Campo incompleto: falta 1 caracter")
          }
          setTransactionTo(e.target.value)
          console.log(e.target.value)
          break;

        case 'moneyAmount':
          setMoneyAmount(e.target.value); // Su nuevo State es el array con la info
          console.log(e.target.value)
          break;

        default:
          break;
      }
    }
  }

  const handleSubmit = async function (e) {
    e.preventDefault();
    const dataTransaction = {
      myAddress: myAddress,
      transactionTo: transactionTo,
      moneyAmount: moneyAmount
    };

    dispatch(TransactionMetaMask(dataTransaction));
    e.target.reset();
    setMyAddress('')
    setTransactionTo('')
    setMoneyAmount('')
  };

  const pay = async function () {
    return web3.eth.sendTransaction({
      from: stateTransaction.myAddress,
      to: stateTransaction.transactionTo,
      value: stateTransaction.moneyAmount,
    })
  }
  const [metaMaskOption, setMetaMaskOption] = useState(true);
  return (
    <div className="App">

      <button className="button" type="button" onClick={() => setMetaMaskOption(!metaMaskOption)} >
        {metaMaskOption ? 'Metamask' : 'Metamask'}
      </button>

      {metaMaskOption ? (
        <div >

        </div>
      ) : (

        <div className="paymentOption">

          <header className="App-header">

            <div id="content">
              <span id="account">
              </span>
              <form onChange={(e) => handleInputChange(e)} onSubmit={(e) => handleSubmit(e)}>
                <br />
                <button id="verWallet" name="myAddress" onClick={(e) => handleClick(e)}>Ver tu Address </button> <strong>{myAddress}</strong>
                <br />
                <label>Address Recipient</label>
                <input type="text" name="transactionTo" placeholder="Quien recibe" value={transactionTo} />

                <label>Cantidad</label>
                <input type="number" name="moneyAmount" placeholder="Monto" value={moneyAmount} />

                <button id="send" >
                  Continuar
                </button>
              </form>
              <button onClick={() => dispatch(pay)}>
                Enviar
              </button>
            </div>

          </header>
        </div>
      )}
    </div>
  );
}

export default PaymentMetaMask;