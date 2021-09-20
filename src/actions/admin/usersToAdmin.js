import axios from 'axios';



export default function usersToAdmin(users) {
  console.log(users,"usersss")
    return function (dispatch) {
            try {
              users.map(u=> axios.put('https://nft-e-commerce11.herokuapp.com/admin/edit/'+u))
              
             } catch (error) {
              console.log(error);
            }  
            
    }
}
