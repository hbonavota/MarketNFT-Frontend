import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNFTs } from "../../actions/getNFTs.js";
import { makeStyles } from '@material-ui/core/styles';
import Cards from "../card/card.jsx"
import Grid from '@material-ui/core/Grid';
import Search from "../Search/Search.jsx"
import SortBy from "../Sortby/Sortby.jsx"

const useStyles = makeStyles((theme) => ({

  gridContainer: {
    marginTop: "100px",
    [theme.breakpoints.up('sm')]: {
      marginTop: "70px",
    },
  }
}));

export default function All() {

  const stateAllNFTs = useSelector((state) => state.allNFTs);
  console.log(stateAllNFTs)


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNFTs());
  }, [dispatch]);


  const classes = useStyles();
  return (
    <React.Fragment>
      <Search></Search>
      <SortBy></SortBy>
      <Grid container spacing={6} justify="center" className={classes.gridContainer}>
        {
          stateAllNFTs ? stateAllNFTs.map(ele => {
            return (
              ele !== null && (
                <div>
                  <Cards ele={ele} />
                </div>
              )
            )
          }) : <h1>Loading</h1>
        }
      </Grid>
    </React.Fragment>
  )
}