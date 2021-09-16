import axios from 'axios';
import { POST_CATEGORIE } from '../constants';


export default function postCategorie(cat) {
    return function (dispatch) {
        return axios.post('https://nft-e-commerce11.herokuapp.com/create/categorie',cat)
            .then((cat) => {
                dispatch({
                    type: POST_CATEGORIE,
                    payload: cat.data
                })
            })
    }
}
