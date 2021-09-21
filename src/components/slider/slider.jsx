import Cards from '../card/card.jsx'
import React from 'react'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'
import style from '../slider/slider.module.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function SliderImage() {
  const stateAllNFTs = useSelector((state) => state.allNFTs)
  const selected = stateAllNFTs.slice(26, 40)

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {

          slidesToShow: 1,
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
              <Cards ele={ele} />
            </div>
          ))
          : null}
      </Slider>
    </div>
  )
}
