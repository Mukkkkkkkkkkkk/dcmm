import React, { useState, useEffect, useContext } from "react";
import { Slider } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CartContext } from "../../CartContext";

// Các đoạn code khác vẫn giữ nguyên như trước...

// ... (SampleNextArrow and SamplePrevArrow components remain unchanged) ...

const FlashCard = ({ productItems }) => {
  const { addToCart } = useContext(CartContext); // Step 2: Use useContext to get addToCart from CartContext
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  // Load danh sách sản phẩm yêu thích từ localStorage khi component được mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavoriteProducts(JSON.parse(savedFavorites));
    }
  }, []);

  // Cập nhật danh sách sản phẩm yêu thích vào localStorage khi có sự thay đổi
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  const isProductFavorite = (product) => {
    return favoriteProducts.some((item) => item.id === product.id);
  };

  const addToFavorites = (product) => {
    const isFavorite = isProductFavorite(product);

    // Nếu sản phẩm đã tồn tại trong danh sách yêu thích, loại bỏ nó
    if (isFavorite) {
      setFavoriteProducts(
        favoriteProducts.filter((item) => item.id !== product.id)
      );
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm nó vào danh sách yêu thích
      setFavoriteProducts([...favoriteProducts, product]);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <Slider {...settings}>
        {productItems.map((product) => {
          const isFavorite = isProductFavorite(product);
          return (
            <div className="box" key={product.id}>
              <div className="product mtop">
                <div className="img">
                  <span className="discount">{product.discount}% Off</span>
                  <img src={product.cover} alt="" />
                  <div className="product-like">
                    <br />
                    {/* Sử dụng onClick để thêm/xóa sản phẩm khỏi danh sách yêu thích */}
                    {isFavorite ? (
                      <i
                        className="fa-solid fa-heart"
                        onClick={() => addToFavorites(product)}
                      ></i>
                    ) : (
                      <i
                        className="fa-regular fa-heart"
                        onClick={() => addToFavorites(product)}
                      ></i>
                    )}
                  </div>
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <div className="price">
                    <h4>${product.price}.00 </h4>
                    <button onClick={() => addToCart(product)}>
                      <Link to={"/DetailProduct/" + product.id}>
                        <i className="fa fa-plus"></i>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default FlashCard;
