import axios from "axios";
import { GET_USERS } from "../constants";


export function getUsers() {
    return function (dispatch) {        
            const users=axios.get('https://nft-e-commerce11.herokuapp.com/admin/users')
            .then((users) => {
                dispatch({
                    type: GET_USERS,
                    payload: users.data
                })
            })
        }
}
