import Cards from "../card/card.jsx"
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNFTs } from "../../actions/getNFTs.js";
import style from "../collectionhome/collectionhome.module.css";
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

// const useStyles = makeStyles((theme) => ({
//     text: {
//       text-decoration:"none",
//     },
// }))


export default function ColectionHome() {

    const stateAllNFTs = useSelector((state) => state.allNFTs);
const selected = stateAllNFTs.slice(14,20)
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getNFTs());
  }, [dispatch]);


    return(
        <div className={style.houselists}>
            {selected. length > 0 ?(
                selected.map((ele) => (
                    <Link to={`nft/${ele._id}`} style={{textDecoration: "none"}}>
                    <div className={style.house} >
                         
                        <img src={ele.image} className={style.image}/>
                        
                        <div class={style.house_name}>{ele.name.slice(0,17)}</div>
                       
                    </div>
                    </Link>
                    
                   
                ))
            ): null}
        </div>
    )
}