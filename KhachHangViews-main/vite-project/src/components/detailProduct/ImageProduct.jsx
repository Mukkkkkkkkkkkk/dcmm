import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageProduct = (props) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const { product } = props;

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);

  let slider1 = null;
  let slider2 = null;
  console.log(">>> đã truyền vào chi tiết hình ảnh", product);

  return (
    <div>
      <Slider asNavFor={nav2} ref={(slider) => (slider1 = slider)}>
        {product.hinhAnh.map((item, index) => (
          <div className="box product" key={index}>
            <div className="img">
              <img src={item.url} alt={item.url} />
            </div>
          </div>
        ))}
      </Slider>
      <br />
      <Slider
        asNavFor={nav1}
        ref={(slider) => (slider2 = slider)}
        slidesToShow={4}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        {product.hinhAnh.map((item, index) => (
          <div className="box product" key={index}>
            <div className="img">
              <img src={item.url} alt={item.url} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageProduct;
