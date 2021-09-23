import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router'


function ResetPass() {
    const {token} = useParams();

    let handleForgot = async(e) => {
        e.preventDefault()
        // console.log(e.target[0].value)
        try {
            await axios.post('http://localhost:8001/reset/'+token, {password : e.target[0].value})
            alert('todo listo intenta no olvidarte de nuevo boludit@')
        } catch (error) {
            alert('qsy anda todo mal')
        }
    }
    return (
        <div>
        <form action="submit" onSubmit={handleForgot}>
            <label htmlFor="pass">nueva pass del boludo</label>
            <input type="text" name='elinput'/>
            <button>SEND</button>
        </form>
        </div>
    )
}

export default ResetPass
