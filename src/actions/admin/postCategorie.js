import axios from 'axios';
import { POST_CATEGORIE } from '../constants';


export default function postCategorie(cat) {
    return function (dispatch) {
        return axios.post('http://localhost:8001/create/categorie',cat)
            .then((cat) => {
                dispatch({
                    type: POST_CATEGORIE,
                    payload: cat.data
                })
            })
    }
}
