import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Cards from "../card/card.jsx";
import Grid from "@material-ui/core/Grid";
import SortBy from "../Sortby/Sortby.jsx";
import { getNFTs } from "../../actions/getNFTs.js";
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { getNFTByName } from "../../actions/getNFTByName";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: "70px",
  },
  search: {
    height: "55px",
    minWidth: "230px",
    position: 'absolute',
    right: "25px",
    top: "5rem",
    marginRight: 0,
/*     width: '100%', */
    width: 'auto',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down(600)]: {
     minWidth: "160px",
     right: "5px",
    },
  },
  searchIcon: {
    top: "3px",
    color: "primary",
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    marginLeft: "17.5px"
  },
 
  textInput: {
    maxHeight: "10rem",

  }
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

    const allCategoriesNFTs = useSelector((state) => state.Nfts);
  const optionsAllNFTs = allCategoriesNFTs.filter((i) => i.categories.includes(id)).sort((a, b) => {
    if (
      a.name?.charAt(0).toLowerCase() >
      b.name?.charAt(0).toLowerCase()
    )
      return 1;
    return -1;
  });
  const [inputName, setInputName] = useState("")

  function handleSubmit(e) {
    if (e.key === "Enter") {
      dispatch(getNFTByName(inputName));
      setInputName("")
    }
  }

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
      <SortBy></SortBy>
      <div className={classes.search} >
      <div className={classes.searchIcon} >
        <SearchIcon fontSize="small" />
      </div>
      <div className={classes.inputInput} >
        <Autocomplete
          value={inputName}
          onChange={(e, newValue) => {
            setInputName(newValue);
          }}
          onKeyPress={(e, newValue) => {
            handleSubmit(e);
            setInputName(newValue);
          }}
          id="free-solo-demo"
          freeSolo
          selectOnFocus={true}
          options={optionsAllNFTs?.map((option) => option.name)}
          renderInput={(params) => (
            <TextField className={classes.inputRoot}{...params} label="Search..." margin="dense" variant="outlined" />
          )}
        />
      </div>
    </div>
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
