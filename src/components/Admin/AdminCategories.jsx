import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import postCategorie from "../../actions/admin/postCategorie"
import { getCategories } from '../../actions/getCategories'
import {deleteCategory} from '../../actions/admin/deleteCategory'
import { Link } from 'react-router-dom'


export default function AdminCategories() {
    const dispatch = useDispatch();
    const categoriesDB=useSelector(state=>state.categories)
    
    useEffect(() => {      
      dispatch(getCategories())   
    }, [dispatch])
    
    const [inputs,setInputs]=useState({
      nameCategory: "",
      deleteCategory: "",
    })
  
    function onInputChange(e) {
       setInputs({ ...inputs, [e.target.name]: e.target.value }); 
      
    }
    
    
    async function handleSubmit(e) {
       e.preventDefault()
       const category ={name:inputs.nameCategory}
       dispatch(postCategorie(category))
       alert('Category created')
       dispatch(getCategories())
       setInputs({nameCategory:""})
       
   }
   async function handleDelete(e) {
    e.preventDefault()
    dispatch(deleteCategory(inputs.deleteCategory))
    alert('Category deleted')
    dispatch(getCategories())
    setInputs({deleteCategory:""})
    
   }

      
    return ( <div> 
      <Link to='/admin'>
      <button>Back</button> 
      </Link>              
              <h3>Modify categories </h3>
              <h4>Add</h4>
              <label>Name</label>
              <input
              required
              type="text"
              name="nameCategory"
              placeholder="New category"
              value={inputs.nameCategory}
              onChange={(e)=>onInputChange(e)}
              />
              <button onClick={handleSubmit}>Create!</button>
  
              <form onSubmit={(e)=>handleDelete(e)}>
              <h4>Delete</h4>
              <label htmlFor="">Categories</label> 
              <select required name="deleteCategory" onChange={(e)=>onInputChange(e)} defaultValue="">
              <option value="">Choose categories</option>
              {categoriesDB.map((cat)=>(
                <option key={cat._id} name={cat.name} value={cat._id}>{cat.name?.charAt(0).toUpperCase()+cat.name?.slice(1)}</option>
              ))}
             </select>
             <button type="submit">Delete!</button>
              </form>
    </div>
  )
}
