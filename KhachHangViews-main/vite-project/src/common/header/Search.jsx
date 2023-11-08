import React from "react";
import logo from "../../components/assets/images/logo.jpg";
import "./search.css"; // Chỉ cần tên file CSS, không cần đường dẫn đầy đủ

import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useCartContext } from "../../CartContext";

const Search = () => {
  const { state } = useCartContext();

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const getTotalQuantity = () => {
    return state.cartItems.reduce((total, item) => total + item.soLuong, 0);
  };
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 90);
  });
  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width">
            <img src={logo} alt="" />
            <span className="" style={{ color: 'blue', textShadow: 'inherit'}}> 404Shoes </span>
          </div>

          <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Tìm kiếm" />
            {/* <span>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="All Category"
                menuVariant="light"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </span> */}
            <i className="fa"></i>
          </div>

          <div className="icon f_flex width">
            <a href="/user/">
              <i className="fa fa-user icon-circle"></i>
            </a>
            <div className="cart">
              <Link to={"/cart"}>
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{getTotalQuantity()}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
