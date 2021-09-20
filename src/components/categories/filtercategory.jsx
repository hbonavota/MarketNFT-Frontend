import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Cards from "../card/card.jsx";
import Grid from "@material-ui/core/Grid";
import Search from "../Search/Search.jsx";
import SortBy from "../Sortby/Sortby.jsx";
import { getNFTs } from "../../actions/getNFTs.js";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: "30px",
  },
}));

export default function FilterCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNFTs());
  }, [dispatch]);

  const stateAllNFTs = useSelector((state) => state.allNFTs);
  const filtered =
    stateAllNFTs.length > 0 &&
    stateAllNFTs.filter((i) => i.categories.includes(id));

  const classes = useStyles();
  return (
    <React.Fragment>
      {/* <SortBy></SortBy> */}
      <Search></Search>
      <Grid container spacing={6} className={classes.gridContainer}>
        {filtered.length > 0 ? (
          filtered.map((ele) => {
            return (
              ele !== null && (
                <div>
                  <Cards ele={ele} />
                </div>
              )
            );
          })
        ) : (
          <h1>Loading</h1>
        )}
      </Grid>
    </React.Fragment>
  );
}
