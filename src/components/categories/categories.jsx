import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getNFTs } from "../../actions/getNFTs.js";
import { filterByCategories } from "../../actions/filtercategory.js";
import { makeStyles } from '@material-ui/core/styles';
import Cards from "../card/card.jsx"
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Search from "../Search/Search.jsx"
import SortBy from "../Sortby/Sortby.jsx"
import Slider from 'react-slick'
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
    backgroundColor: "#A2DBFA",
    "&:hover": {
      backgroundColor: "#185ADB"
    },


  },
  insidetext: {
    marginTop: "5%"
  }
}));

export default function Categories() {
  const classes = useStyles();
  const stateCategories = useSelector((state) => state.categories)
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
    setloading(false)
  }, [dispatch]);

  const handleclick = (e) => {
    e.preventDefault();
    dispatch(filterByCategories(e.currentTarget.value))
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 800,
        settings: {

          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {

          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  }




  return (
    <React.Fragment>
      <SortBy></SortBy>
      <Search props={"justcategories"}></Search>
      <Slider {...settings} className="slider">
        {stateCategories.length > 0
          ? stateCategories.map((ele) => (
            <Button key={ele._id} variant="outlined" onClick={(e) => handleclick(e)} value={ele._id}
              className={classes.button0}
            //  className={`color${Math.floor(Math.random() * 10)}` }
            >
              <h4 className={classes.insidetext}>{ele.name}</h4>

            </Button>
          ))
          : null}
      </Slider>
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