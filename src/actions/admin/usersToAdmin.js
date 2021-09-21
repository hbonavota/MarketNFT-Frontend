import axios from 'axios';



export default function usersToAdmin(users) {
  console.log(users,"usersss")
    return function (dispatch) {
            try {
              users.map(u=> axios.put('/admin/edit/'+u))
              
             } catch (error) {
              console.log(error);
            }  
            
    }
}
