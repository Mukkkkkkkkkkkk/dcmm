import React, { useState, useEffect, createContext } from "react";

const CartContext = createContext();

const CartProvider = (props) => {
  const { productItems } = Data; // Import Data from the appropriate file (I assume it's imported here)

  // Step 2:
  const [CartItem, setCartItem] = useState([]);

  // Step 4:
  const addToCart = (product) => {
    // Your existing addToCart function implementation here...
  };

  // Step 6:
  const decreaseQty = (product) => {
    // Your existing decreaseQty function implementation here...
  };

  // Step 7: Tải các mục hàng trong giỏ hàng từ localStorage khi component được mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItem(JSON.parse(savedCart));
    }
  }, []);

  // Step 8: Cập nhật localStorage khi có sự thay đổi về các mục hàng trong giỏ hàng
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(CartItem));
  }, [CartItem]);

  // Step 9: Hàm thêm sản phẩm yêu thích vào danh sách yêu thích trong localStorage
  const addToFavorites = (productId) => {
    // Your implementation to add the product id to the favorites list in localStorage
  };

  // Step 10: Export CartContext và CartProvider
  return (
    <CartContext.Provider
      value={{
        CartItem,
        addToCart,
        decreaseQty,
        addToFavorites,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
