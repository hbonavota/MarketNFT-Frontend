import React from 'react'
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useSelector } from 'react-redux'
import Slider from 'react-slick'
import style from '../slider/slider.module.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function SliderCategory() {
  const stateAllNFTs = useSelector((state) => state.allNFTs)
  const stateCategories = useSelector((state) => state.categories)
  
  const selected = stateCategories && stateCategories.map(ele=> (
    {name:ele.name, id:ele._id, image: stateAllNFTs.filter((i) => i.categories.includes(ele._id))[0] !==undefined?
        stateAllNFTs.filter((i) => i.categories.includes(ele._id))[0]: {image:"https://i2.wp.com/criptotendencia.com/wp-content/uploads/2021/05/Cuanto-cuesta-crear-un-NFT-en-la-Blockchain.jpg?fit=1200%2C720&ssl=1"}}));

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
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
  };
  return (
    <div>
      <Slider {...settings}>
        {selected.length > 0
          ? selected.map((ele) => (
            <div className={style.house}>
                
              <Card style={{ textDecoration: "none" }} component={Link} to={`/categories/${ele.id}`} elevation={1} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={ele.image.image !=undefined? ele.image.image: null}
          alt={ele.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {ele.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button component={Link} to={`/categories/${ele.id}`} size="small" color="secondary">
          View
        </Button>
      </CardActions>
    </Card>
            </div>
          ))
          : null}
      </Slider>
    </div>
  )
}
