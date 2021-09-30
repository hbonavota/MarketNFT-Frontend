import axios from 'axios';



export default function usersToAdmin(users) {
    return function (dispatch) {
            try {
              axios.put('/admin/edit/'+users)
              
             } catch (error) {
              console.log(error);
            }  
            
    }
}
