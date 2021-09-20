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
    zIndex: 999,
    minWidth: "230px",
    position: 'fixed',
    right: "15px",
    marginBottom: "15px",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: theme.palette.primary.main,
    // '&:hover': {
    //   backgroundColor: theme.palette.secondary.main,
    // },
    marginRight: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
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
    position: "relative",
    top: "1.5px",
    color: 'white',
    padding: theme.spacing(1, 1, 1, 0),
    height: "20px",
    marginTop: "0px",
    minWidth: "10rem",
  },
  inputInput: {

    marginTop: 0,
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  textInput: {
    maxHeight: "10rem",

  }
}));

export default function Search() {
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
        <SearchIcon />
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
  )
}