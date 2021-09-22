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
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { addShoppingTrolley } from "../../actions/addShoppingTrolley";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { conectLS } from "../../actions/conectLS.js";
import React, { useEffect } from "react";
import addToDB from "../../actions/shoppingCart/addToDB";
import cartDB from "../../actions/shoppingCart/cartDB.js";
import addFavorite from "../../actions/favorite/addFavorite";

const useStyles = makeStyles({
  card: {
    margin: "10px",
    minHeight: "30rem",
    Width: "310px",
    maxWidth: "310px",
    "&:hover": {
      elevation: 5,
    },
  },
  head: {
    maxHeight: "12px",
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
    opacity: 0.7,
    color: "error",
    "&:hover": {
      color: "#FF0000",
    },
  },
  favoriteIconButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

export default function Cards({ ele }) {
  const classes = useStyles();
  const userLogged = useSelector((state) => state.userLogged);
  const dispatch = useDispatch();

  const handleFav = (ele) => {
    dispatch(addFavorite({ item: ele._id, user: userLogged }));
  };

  const handleClick = (ele) => {
    if (!userLogged) {
      dispatch(addShoppingTrolley(ele._id));
    } else {
      dispatch(addToDB({ id: ele._id, user: userLogged }));
    }
  };
  const carrito = useSelector((state) => state.shoppingTrolley);

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
      <Card component={Paper} elevation={1} className={classes.card}>
        <CardHeader
          className={classes.head}
          action={
            <IconButton className={classes.favoriteIconButton}>
              {userLogged ? (
                <FavoriteBorderIcon
                  onClick={() => handleFav(ele)}
                  className={classes.favorite}
                />
              ) : null}
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
          <Typography>{ele.name}</Typography>
          <Typography>Price: {ele.price}ETH</Typography>
          <AddShoppingCartIcon onClick={() => handleClick(ele)} />
        </CardContent>
      </Card>
    </div>
  );
}
