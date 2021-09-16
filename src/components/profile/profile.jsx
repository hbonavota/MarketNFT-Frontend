import './profile.css';
import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import getProfileUser from "../../actions/getProfileUser"
import getClean from "../../actions/getClean"


export default function Profile() {
    const Web3 = require('web3');
    const web3 = new Web3(window.ethereum);
    const { id } = useParams();
    console.log("id desde useParams en profile", id)
    const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProfileUser())
    return () => {
      dispatch(getClean())
    }
  }, [dispatch])
  
  
  const getProfile = useSelector((state) => state.profileUserData)
  console.log("Información del perfil desded el Reducer:", getProfile[0])


  const connect = async function () {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else {
      alert(' Please Install Metamask')
      window.open(
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
        '_blank'
      )
    }
  }
   
  return (
    <main className="container">

      <aside className="aside">

        <div className="infoProfile">
          <img src={getProfile[0]? getProfile[0].image : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/1024px-Imagen_no_disponible.svg.png"} alt="Not Found" />
        </div>
        <div className="accesos">

          <a href="">Historial de compras</a>
          <a href="">Carrito</a>
          <a href="">Configuración</a>
        </div>

        <div>
            {<button id='connect' onClick={connect}>
            Conectá tu cuenta Metamask
            </button>}
            <h4>¿No tienes una? <br/>
            Haz click <button>Aquí</button> para crear tu wallet.</h4> 
          </div>
      </aside>

      <section className="section">
      
        
        <div>
            <h1>{getProfile[0]?.name}</h1>
            <h3>{getProfile[0]?.description}</h3>
          
          <h4>Tus publicaciones</h4>

        </div>
      

      </section>

    </main>
  )
}