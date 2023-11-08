import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

// Khởi tạo Context
const CartContext = createContext();

// Hàm Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: addToCart(state.cartItems, action.payload),
      };
    case "CHANGE_QUANTITY":
      return {
        ...state,
        cartItems: changeQuantity(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

// Hàm thêm sản phẩm vào giỏ hàng
const addToCart = (cartItems, newItem) => {
  const existingItem = cartItems.find((item) => item.id === newItem.id);

  if (existingItem) {
    return cartItems.map((item) =>
      item.id === newItem.id ? { ...item, soLuong: item.soLuong + newItem.soLuong } : item
    );
  } else {
    return [...cartItems, newItem];
  }
};

// Hàm thay đổi số lượng sản phẩm trong giỏ hàng
const changeQuantity = async (cartItems, { itemUpdate, changeType }) => {
  try {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemUpdate.id) {
        if (changeType === "increase") {
          return { ...item, soLuong: itemUpdate.soLuong + 1 };
        } else {
          return { ...item, soLuong: itemUpdate.soLuong - 1 };
        }
      }
      return item;
    });

    // Gọi API để cập nhật số lượng sản phẩm trên server
    await axios.put(`http://localhost:3000/cart/${itemUpdate.id}`, {
      soLuong: itemUpdate.soLuong
    });

    return updatedItems;
  } catch (error) {
    console.error("Error changing quantity:", error);
    return cartItems;
  }
};
// Hàm lấy số lượng sản phẩm trong giỏ hàng từ URL
const fetchCartItems = async () => {
  try {
    const response = await axios.get("http://localhost:3000/cart");
    return response.data.cart;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
};

// Hàm tạo Context Provider
const CartProvider = ({ children }) => {
  const initialState = {
    cartItems: [],
    favorites: [],
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const fetchCartData = async () => {
      const cartItems = await fetchCartItems();
      dispatch({ type: "GET_CART_ITEMS", payload: cartItems });
    };

    fetchCartData();
  }, []); // Chỉ gọi 1 lần khi khởi tạo

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.cartItems, state.favorites]);

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        changeQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hàm sử dụng Context
const useCartContext = () => useContext(CartContext);

export { CartProvider, useCartContext };
