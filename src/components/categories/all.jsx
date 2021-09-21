import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getNFTs} from "../../actions/getNFTs.js";
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

  const [loading, setloading] = useState(true);
  let [IndexOfTheLastPost, setIndexOfTheLastPost] = useState(12) ;
  const observer = useRef();

  const lastCardElementRef = useCallback(node => {
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && IndexOfTheLastPost < stateAllNFTs.length) {
        setIndexOfTheLastPost(IndexOfTheLastPost+12)
        setloading(false)
      }
    })
    if(node) observer.current.observe(node)
  },[IndexOfTheLastPost, stateAllNFTs.length]);




  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNFTs());
  }, [dispatch]);
 
    const classes = useStyles();
    return(
        <React.Fragment>
          <Search></Search>
          <SortBy></SortBy>
          <Grid container spacing={6} justify="center"  className={classes.gridContainer}>
              {
                  stateAllNFTs.slice(0, IndexOfTheLastPost).length > 0 && stateAllNFTs.slice(0, IndexOfTheLastPost).map((ele, index) => {
                   if(stateAllNFTs.slice(0, IndexOfTheLastPost).length  === index+1) { return (
                       
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
    )
}