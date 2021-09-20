import axios from 'axios';
import { IS_AUTORIZATED } from './constants'

export default function IsAutorize() {
    return (dispatch) => {
        return axios.get(`https://nft-e-commerce11.herokuapp.com/google/callback`)
            .then(response => {
                dispatch({ type: IS_AUTORIZATED, payload: response.data })
            })
    }
}