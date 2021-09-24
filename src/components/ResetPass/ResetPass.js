import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router'
import "./ResetPass.css"


function ResetPass() {
    const {token} = useParams();

    let handleForgot = async(e) => {
        e.preventDefault()
        // console.log(e.target[0].value)
        try {
            await axios.post('http://localhost:8001/reset/'+token, {password : e.target[0].value})
            alert('Your Password Was Modified Successfully')
        } catch (error) {
            alert('something go wrong')
        }
    }
    return (
        <div className="passcontainer">
        <form action="submit" onSubmit={handleForgot}>
            <label htmlFor="pass">Insert Your New Password</label>
            <input type="text" name='elinput' className="input"/>
            <button className="send">SEND</button>
        </form>
        </div>
    )
}

export default ResetPass
