import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNFTs} from "../../actions/getNFTs.js";
import { filterByCategories } from "../../actions/filtercategory.js";
import { makeStyles } from '@material-ui/core/styles';
import Cards from "../card/card.jsx"
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Search from "../Search/Search.jsx"
import SortBy from "../Sortby/Sortby.jsx"
import Slider from 'react-slick'
import {useTheme} from '@material-ui/core/styles'
import "./categories.css"

const useStyles = makeStyles((theme) => ({
    
    gridContainer: {
      marginTop: "30px"
    },
    button0: {
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      height: "50px",
      borderRadius: "8%",
      maxWidth: "200px",
      backgroundColor: "rgba(199, 248, 237, 0.5)",
      "&:hover": {
        backgroundColor: "rgba(199, 248, 237, 0.9)"
      },
     
      
    },
    insidetext: {
      marginTop: "5%"
    }
  }));

export default function Categories() {
  const classes = useStyles();
  const theme = useTheme();
  const stateCategories = useSelector((state) => state.categories)
  const stateAllNFTs = useSelector((state) => state.allNFTs);
  


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNFTs());
  }, [dispatch]);

  const handleclick = (e) => {
    e.preventDefault();
    console.log(e.currentTarget)
    dispatch(filterByCategories(e.currentTarget.value))
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: true,
  }

 
  
    return(
        <React.Fragment>
          {/* <SortBy></SortBy> */}
          <Search></Search>
          <Slider {...settings} className="slider">
        {stateCategories.length > 0
          ? stateCategories.map((ele) => (
          <Button variant="outlined" onClick={(e)=>handleclick(e)} value={ele._id}
            className={classes.button0}
            //  className={`color${Math.floor(Math.random() * 10)}` }
             >
               <h4 className={classes.insidetext}>{ele.name}</h4>
           
              </Button>
            ))
          : null}
      </Slider>
          <Grid container spacing={6}  className={classes.gridContainer}>
              {
                  stateAllNFTs  ? stateAllNFTs.map(ele => {
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