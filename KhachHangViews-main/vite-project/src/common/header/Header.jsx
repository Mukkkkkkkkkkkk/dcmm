import React from "react";
import "./Header.css";
import Head from "./Head";
import Search from "./Search";
import NavbarMenu from "./Navbar";

const Header = ({ CartItem }) => {
  return (
    <div id="headerShaDown">
      <Head />
      <Search />
      <NavbarMenu />
    </div>
  );
};

export default Header;
