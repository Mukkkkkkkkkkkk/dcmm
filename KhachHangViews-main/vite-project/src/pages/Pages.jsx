import React from "react";
import Slider from "react-slick";
import "./Pages.css"; // Chỉ cần tên file CSS, không cần đường dẫn đầy đủ
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "../components/MainPage/Home";
import Shop from "../components/shops/Shop";
import Wrapper from "../components/wrapper/Wrapper";
import Annocument from "../components/annocument/Annocument";
import FlashDeals from "../components/flashDeals/FlashDeals";

const bannerImages = [
  "https://file.hstatic.net/1000230642/collection/3_da9a91027cd0488581c18e767bd6e453_master.jpg",
  "https://image.phunuonline.com.vn/fckeditor/upload/2022/20220901/images/running-feet.jpeg_151662005183.jpeg",
  "https://phukienthethao88.com/wp-content/uploads/2021/08/ban-giay-hieu-.jpeg",
];

const Pages = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className="mb-5" style={{ minHeight: "150vh" }}>
        <Slider {...settings} className="banner-slider">
          {bannerImages.map((image, index) => (
            <img
              key={index}
              className="w-100 banner-image" // Thêm class h-auto để giữ tỷ lệ khung hình
              src={image}
              alt={`banner-${index}`}
            />
          ))}
        </Slider>
        <div className="d-flex ps-5 pt-5 mt-5">
          <i className="fa fa-bolt fs-1"></i>
          <h1> Flash Deals</h1>
        </div>
        <FlashDeals />
        <br />
        <Shop></Shop>
        <br />
        {/* <Annocument /> */}
        <br />
        {/* <Wrapper /> */}
      </div>
    </>
  );
};

export default Pages;
