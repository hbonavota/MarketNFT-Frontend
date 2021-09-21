import React, { useState, useEffect, useRef, useCallback } from 'react'
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
    marginTop: "45px",
  },
}));

export default function FilterCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNFTs());
    setloading(false)
  }, [dispatch]);

  const stateAllNFTs = useSelector((state) => state.allNFTs);
  const filtered =
    stateAllNFTs.length > 0 &&
    stateAllNFTs.filter((i) => i.categories.includes(id));

    const [loading, setloading] = useState(true);
    let [IndexOfTheLastPost, setIndexOfTheLastPost] = useState(12) ;
    const observer = useRef();
  
    const lastCardElementRef = useCallback(node => {
      if(observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting && IndexOfTheLastPost < filtered.length) {
          setIndexOfTheLastPost(IndexOfTheLastPost+12)
          setloading(false)
        }
      })
      if(node) observer.current.observe(node)
    },[IndexOfTheLastPost, stateAllNFTs.length]);


  const classes = useStyles();
  return (
    <React.Fragment>
      {/* <SortBy></SortBy> */}
      <Search></Search>
      <Grid container spacing={6} justify="center"  className={classes.gridContainer}>
              {
                  filtered.length>0 && filtered.slice(0, IndexOfTheLastPost).length > 0 && filtered.slice(0, IndexOfTheLastPost).map((ele, index) => {
                   if(filtered.slice(0, IndexOfTheLastPost).length  === index+1) { return (
                       
                        <div key={ele._id} ref={lastCardElementRef}>
                          <Cards ele={ele} />
                        </div>)
                      
              } else return (
                       
                <div key={ele._id}>
                  <Cards ele={ele} />
                </div>)
            
            })
              }
              <h1>{loading && "Loading..."}</h1>
          </Grid>
    </React.Fragment>
  );
}
