import React, { useContext } from "react";
import Home from "../components/MainPage/Home";
import FlashDeals from "../components/flashDeals/FlashDeals";
import TopCate from "../components/top/TopCate";
import NewArrivals from "../components/newarrivals/NewArrivals";
import Discount from "../components/discount/Discount";
import Shop from "../components/shops/Shop";
import Annocument from "../components/annocument/Annocument";
import Wrapper from "../components/wrapper/Wrapper";
import { CartContext } from "../CartContext"; // Import the CartContext

const Pages = ({ productItems, shopItems }) => {
  // Step 2: Use useContext to get CartItem and addToCart from CartContext
  const { CartItem, addToCart } = useContext(CartContext);

  return (
    <>
      {/* Step 3: Pass CartItem to Home component */}
      <Home CartItem={CartItem} />
      {/* Step 3: Pass productItems and addToCart to FlashDeals component */}
      <FlashDeals productItems={productItems} addToCart={addToCart} />
      <TopCate />
      <NewArrivals />
      <Discount />
      {/* Step 3: Pass shopItems and addToCart to Shop component */}
      <Shop shopItems={shopItems} addToCart={addToCart} />
      <Annocument />
      <Wrapper />
    </>
  );
};

export default Pages;
