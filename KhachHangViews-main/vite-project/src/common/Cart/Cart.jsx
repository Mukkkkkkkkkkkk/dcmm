import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [x, setX] = useState();

  const getCartItemsFromLocalStorage = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cart');
      if (response.status === 200 && Array.isArray(response.data)) {
        const cartItemsTemp = await Promise.all(response.data.map(async (data) => {
          const res = await axios.get('http://localhost:3000/products/' + data.id);
          return { ...res.data, soLuong: data.soLuong };
        }));
        setCartItems(cartItemsTemp);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Gọi hàm để lấy danh sách sản phẩm khi component được tải lần đầu
  useEffect(() => {
    getCartItemsFromLocalStorage();
  }, [x]);

  // Tính tổng giá tiền của giỏ hàng
  const totalPrice = cartItems.reduce(
    (price, item) => price + item.soLuong * item.giaBan,
    0
  );

  const changeQuantity = async ({ itemUpdate, changeType }) => {
    try {
      const updatedItems = cartItems.map((item) => {
        if (item.id === itemUpdate.id) {
          if (changeType === "increase") {
            return { ...item, soLuong: item.soLuong + 1 };
          } else {
            return { ...item, soLuong: item.soLuong - 1 };
          }
        }
        return item;
      });

      setCartItems(updatedItems);

      // Gọi API để cập nhật số lượng sản phẩm trên server
      await axios.put(`http://localhost:3000/cart/${itemUpdate.id}`, {
        soLuong: itemUpdate.soLuong
      });

    } catch (error) {
      console.error("Error changing quantity:", error);
    }
  };

  const addToCart = (item) => {
    changeQuantity({ itemUpdate: item, changeType: "increase" });
  };

  const decreaseQty = (item) => {
    if (item.soLuong > 1) {
      changeQuantity({ itemUpdate: item, changeType: "decrease" });
    } else {
      axios.delete("http://localhost:3000/cart/" + item.id)
      setX(item.soLuong)
    }
  };

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {cartItems.length === 0 && (
              <h1 className="no-items product">Không có sản phẩm nào trong giở hàng</h1>
            )}

            {cartItems.map((item) => {
              const productQty = item.giaBan * item.soLuong;

              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={item.hinhAnh[1].url} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      {item.giaBan}.00 * {item.soLuong}
                      <span>{productQty}.00 vnđ</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <a className="removeCart" href={`/product/${item.id}`}>
                        <i className="fa-regular fa-eye"></i>
                      </a>
                    </div>
                    <div className="cartControl d_flex">
                      <button className="incCart" onClick={() => addToCart(item)}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button className="desCart" onClick={() => decreaseQty(item)}>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product">
            <h2>Cart Summary</h2>
            <div className="d_flex">
              <h4>Tổng tiền :</h4>
              <h3>{totalPrice}.00 vnđ </h3>
            </div>

            <a href="/Payment/" className="btn btn-primary">
              Thanh toán
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
