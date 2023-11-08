import React, { useState, useEffect } from "react";

const ShopCart = ({ shopItems, addToCart }) => {
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

  return (
    <>
      {shopItems.map((shopItem) => {
        const isFavorite = isProductFavorite(shopItem);
        return (
          <div className="box" key={shopItem.id}>
            <div className="product mtop">
              <div className="img">
                <span className="discount">{shopItem.discount}% Off</span>
                <img src={shopItem.cover} alt="" />
                <div className="product-like">
                  <br />
                  {/* Sử dụng onClick để thêm/xóa sản phẩm khỏi danh sách yêu thích */}
                  {isFavorite ? (
                    <i
                      className="fa-solid fa-heart"
                      onClick={() => addToFavorites(shopItem)}
                    ></i>
                  ) : (
                    <i
                      className="fa-regular fa-heart"
                      onClick={() => addToFavorites(shopItem)}
                    ></i>
                  )}
                </div>
              </div>
              <div className="product-details">
                <h3>{shopItem.name}</h3>

                <div className="price">
                  <h4>${shopItem.price}.00 </h4>
                  <button onClick={() => addToCart(shopItem)}>
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShopCart;
