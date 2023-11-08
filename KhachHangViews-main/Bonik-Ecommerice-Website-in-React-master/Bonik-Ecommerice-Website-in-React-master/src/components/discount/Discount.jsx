import React from "react";
import Dcard from "./Dcard";

const Discount = () => {
  return (
    <>
      <section className="Discount background NewArrivals">
        <div className="container">
          <div className="heading d_flex">
            <div className="heading-left row  f_flex">
              <h2>Big Discounts</h2>
            </div>
            <div className="heading-right row ">
              <span>
                View all <i className="fa-solid fa-caret-right"></i>
              </span>
            </div>
          </div>
          <Dcard />
        </div>
      </section>
    </>
  );
};

export default Discount;
