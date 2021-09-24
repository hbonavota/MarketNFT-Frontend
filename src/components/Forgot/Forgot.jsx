import axios from 'axios'
import React from 'react'
import "./forgot.css"

 export default function Forgot() {
    let handleForgot = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8001/forgot', {username : e.target[0].value})
            alert('The E-mail was sent, Please check your Inbox')
        } catch (error) {
            alert('This User does not exists')
        }
    }
    
    // let handleChange = () => {

    // }
    return (
        <div>
        <form action="submit" onSubmit={handleForgot}>
            <label htmlFor="pass">Reset Password</label>
            <input placeholder="Insert your e-mail" type="text" name='elinput' className="input"/>
            <button className="send">SEND</button>
        </form>
        </div>
            
    )
}

