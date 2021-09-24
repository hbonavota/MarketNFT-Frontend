import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardMedia,
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { addShoppingTrolley } from "../../actions/addShoppingTrolley";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { conectLS } from "../../actions/conectLS.js";
import React, { useEffect } from "react";
import addToDB from "../../actions/shoppingCart/addToDB";
import cartDB from "../../actions/shoppingCart/cartDB.js";
import addFavorite from "../../actions/favorite/addFavorite";
import { useState } from "react";
import Ethereum_logo from "../images/Ethereum_logo.png"


const useStyles = makeStyles({
  card: {
    margin: "10px",
    minHeight: "31.5rem",
    Width: "310px",
    maxWidth: "310px",
    "&:hover": {
      elevation: 5,
    },
  },
  head: {
    maxHeight: "40px",
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
    margin: "5px",
  },
  favorite: {
    padding: 0,
    position: "absolute",
    top: "0px",
    right: "5px",
    opacity: 0.7,
    "&:hover": {
      color: "#FF0000",
    },
  },
  favoritered: {
    padding: 0,
    position: "absolute",
    top: "0px",
    right: "5px",
    opacity: 0.7,
    color: "#FF0000",
  },
  cart: {
    "&:hover": {
      color: "#6ECB63",
    },
  },
  IconButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  grid: {
    marginTop: "8px"
  }
});

export default function Cards({ ele }) {
  const [elevation, setelevation] = useState(1);
  const classes = useStyles();
  const userLogged = useSelector((state) => state.userLogged);
  const favorites = useSelector((state)=> state.favorites);
  const isfavorite = favorites.includes(ele._id);
  const dispatch = useDispatch();

  const handleFav = (ele) => {
    dispatch(addFavorite({ item: ele._id, user: userLogged }));
  };

const onMouseOver = () => {
  setelevation(10)
}
const onMouseOut = () => {
  setelevation(1)
}

  const handleClick = (ele) => {
    if (!userLogged) {
      dispatch(addShoppingTrolley(ele._id));
    } else {
      dispatch(addToDB({ id: ele._id, user: userLogged }));
    }
  };

  useEffect(() => {
    if (!userLogged) {
      dispatch(conectLS());
    } else {
      dispatch(cartDB({ user: userLogged }));
    }
    // return () => {
    //   dispatch(getNFTs());
    // };
  }, [dispatch]);

  return (
    <div>
      <Card 
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      component={Paper} elevation={elevation} className={classes.card}>
        {isfavorite?
        <CardHeader
        className={classes.head}
        action={
          <IconButton disableRipple="true" className={classes.IconButton}>
            {userLogged ? (
              <FavoriteIcon
                onClick={() => handleFav(ele)}
                className={classes.favoritered}
              />
            ) : null}
          </IconButton>
        }
      />
        :<CardHeader
        className={classes.head}
        action={
          <IconButton disableRipple="true" className={classes.IconButton}>
            {userLogged ? (
              <FavoriteBorderIcon
                onClick={() => handleFav(ele)}
                className={classes.favorite}
              />
            ) : null}
          </IconButton>
        }
      />}
        
        <CardMedia
          component={Link}
          to={`nft/${ele._id}`}
          className={classes.media}
          image={ele.image ? ele.image : ele.images}
          title={ele.name}
        />
        <CardContent className={classes.cardContent}>

          <Typography variant="body" color="primary">{ele.name}</Typography>
          <Grid container className={classes.grid}> 
            <Typography>Price: {ele.price}</Typography><img src={Ethereum_logo} width="20px" height="25px" alt="" />
            </Grid>


          <IconButton className={classes.IconButton}>
            <AddShoppingCartIcon
              className={classes.cart}
              onClick={() => handleClick(ele)}
            />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  );
}
