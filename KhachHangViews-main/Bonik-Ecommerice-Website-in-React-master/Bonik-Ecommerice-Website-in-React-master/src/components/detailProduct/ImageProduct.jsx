import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductData from "./ProductData";

const ImageProduct = () => {
  console.log(ProductData);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <Slider {...settings}>
        {ProductData.imgs.map((value, index) => {
          return (
            <>
              <div className="box product" key={index}>
                <div className="img">
                  <img src={value.url} alt={value.url} />
                </div>
              </div>
            </>
          );
        })}
      </Slider>
    </>
  );
};

export default ImageProduct;
