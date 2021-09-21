import axios from 'axios';

export function getNFTByName(name) {

    return function (dispatch) {
        return axios.get('/search?query=' + name)
            .then((NFTByName) => {
                dispatch({
                    type: "GET_NFT_BY_NAME",
                    payload: NFTByName.data
                })
            })
    }
}