import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Card,
   CardHeader, 
   CardMedia, 
   Container, 
   Paper,
   Avatar, 
   Typography } from '@material-ui/core'
import CardContent from "@material-ui/core/CardContent";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { addShoppingTrolley } from "../../actions/addShoppingTrolley";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { conectLS } from "../../actions/conectLS.js";
import React, { useEffect } from "react";
import addToDB from '../../actions/shoppingCart/addToDB';
import cartDB from '../../actions/shoppingCart/cartDB.js'


const useStyles = makeStyles({
  card: {
    margin: "10px",
    minHeight: "30rem",
    Width: "310px",
    maxWidth: "310px",
    '&:hover': {
      elevation: 5,
    }
  },
  head: {
    maxHeight: "40px"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
    borderRadius: "2%",
    width: "300px",
    margin: "5px"
  },
  favorite: {
    padding: 0,
    position: "absolute",
    top: "0px",
    right: "5px",
    opacity: 0.7,
    color: "error",
    '&:hover': {
      color: "#FF0000",
    },
  },
  cart: {
    '&:hover': {
      color: "#6ECB63",
    }
  },
  IconButton: {
    "&:hover":  {
      backgroundColor: "transparent"
    }
  }
});

export default function Cards({ ele }) {
  const classes = useStyles();
  const userLogged = useSelector((state) => state.userLogged);
  const dispatch = useDispatch();

  const handleClick = (ele)=>{
    if(!userLogged){
      dispatch(addShoppingTrolley(ele._id));
    }else{
      dispatch(addToDB({id:ele._id,user:userLogged}))
    }
  }
  const carrito = useSelector((state) => state.shoppingTrolley);
 
  useEffect(() => {
    if(!userLogged){
      dispatch(conectLS())
    }else{
      dispatch(cartDB({user:userLogged}))
     
    }
    // return () => {
    //   dispatch(getNFTs());
    // };
  }, [dispatch]);

  return (
    <div>
      <Card component={Paper} elevation={1} className={classes.card}
      >
        <CardHeader className={classes.head}
          action={
            <IconButton disableRipple="true" className={classes.IconButton}>
              {userLogged? 
              <FavoriteBorderIcon className={classes.favorite} />
              :null}
              
            </IconButton>
          }
          />
        <CardMedia
          component={Link}
          to={`nft/${ele._id}`}
          className={classes.media}
          image={ele.image ? ele.image : ele.images}         
          title={ele.name}
          />
        <CardContent className={classes.cardContent}>
          <Typography variant="body" color="primary">{ele.name}</Typography>
          <Typography>Price: {ele.price}ETH</Typography>
          <IconButton className={classes.IconButton}>
          <AddShoppingCartIcon className={classes.cart} onClick={() => handleClick(ele)} />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  );
}
