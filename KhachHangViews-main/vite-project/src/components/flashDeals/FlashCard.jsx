import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Products from "../shopProduct/Products";

const FlashCard = (props) => {
  const { products } = props;

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <>
      <Slider {...settings}>
        {products.map((item, index) => {
          return (<div key={index}>
            <Products CardBody={false} product={item} /></div>
          )
        })}

      </Slider>
    </>
  );
};

export default FlashCard;
