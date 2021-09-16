import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import usersToAdmin from '../../actions/admin/usersToAdmin'
import { getUsers } from '../../actions/admin/getUsers';
import { Link } from 'react-router-dom';
import {deleteUser} from '../../actions/admin/deleteNFT'

export default function AdminUser() {   
    const dispatch = useDispatch();
    const users=useSelector(state=>state.allUsers)
  
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const [inputs,setInputs]=useState({
        deleteUser: [],
        users:[]
      })
    
    function onInputChange(e) {
       e.preventDefault()
       setInputs({
           ...inputs,
           [e.target.name]: inputs[e.target.name].concat(e.target.value)
          });
         
      }
      async function handleDeleteUser(e) {
        e.preventDefault();
        dispatch(deleteUser(inputs.deleteUser));
        alert("User deleted");
        dispatch(getUsers());
        setInputs({ deleteUser: [""] });
      }
    
      
    async function handleRole(e) {
        e.preventDefault()
        dispatch(usersToAdmin(inputs.users))
        alert('Role changed')
        dispatch(getUsers())
        setInputs({users:['']})
        
      }
     
     
    
    return ( <div>
       <Link to='/admin'>
      <button>Back</button> 
      </Link>   
             <h2>Users</h2>

             <form name="users" 
            onSubmit={(e)=>handleRole(e)}
            >
            <h3>Change role</h3>
            <label htmlFor="">Users To Admin</label>             
            <div>
              {users.map((u) => (
                <div key={u._id}>
                  <input
                    type="checkbox"
                    name="users"
                    value={u.username}
                    onChange={(e)=>onInputChange(e)}
                    ></input>
                    <div>
                  <label name={u.firstName}> {u.firstName}- {u.username} </label>
                  </div>
                </div>
              ))}
            </div>            
           <button type="submit">Change!</button>
           </form>
           
      <form onSubmit={(e) => handleDeleteUser(e)}>
        <h3>Delete User</h3>
        <label htmlFor="">Users</label>
        <select
          name="deleteUser"
          onChange={(e) => onInputChange(e)}
          defaultValue=""
        >
          <option value="">Choose User</option>
          {users.map((u) => (
            <option key={u._id} name={u._id} value={u._id}>
              {" "}
              {u.username}{" "}
            </option>
          ))}
        </select>
        <button type="submit">Delete User!</button>
      </form>
           

       </div>
      )
    }