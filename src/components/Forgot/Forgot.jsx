import axios from 'axios'
import React from 'react'

function Forgot() {
    let handleForgot = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8001/forgot', {username : e.target[0].value})
            alert('email enviado chequea ese inbox')
        } catch (error) {
            alert('el usuario no existe')
        }
    }
    
    // let handleChange = () => {

    // }
    return (
        <div>
        <form action="submit" onSubmit={handleForgot}>
            <label htmlFor="pass">email del perdido</label>
            <input type="text" name='elinput'/>
            <button>SEND</button>
        </form>
        </div>
            
    )
}

export default Forgot
