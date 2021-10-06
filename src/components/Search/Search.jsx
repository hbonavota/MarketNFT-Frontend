import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getNFTByName } from "../../actions/getNFTByName";
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
    marginLeft:'180px',
  },
  inputRoot: {
    marginLeft: "17.5px"
  },
 
  textInput: {
    maxHeight: "10rem",

  }
}));

export default function Search({props}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allCategoriesNFTs = useSelector((state) => state.Nfts);
  const optionsAllNFTs = allCategoriesNFTs.sort((a, b) => {
    if (
      a.name?.charAt(0).toLowerCase() >
      b.name?.charAt(0).toLowerCase()
    )
      return 1;
    return -1;
  });

  const allNFTs = useSelector((state) => state.allNFTs);
  const allNFTssorted = allNFTs.sort((a, b) => {
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

  return (
    <div className={classes.search} >
      <div className={classes.searchIcon} >
        <SearchIcon fontSize="small" />
      </div>
      <div className={classes.inputInput} >
        {props === "allnfts"? <Autocomplete
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
        />:
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
          options={allNFTssorted?.map((option) => option.name)}
          renderInput={(params) => (
            <TextField className={classes.inputRoot}{...params} label="Search..." margin="dense" variant="outlined" />
          )}
        />}
        
      </div>
    </div>
  )
}