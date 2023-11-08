import React, { useEffect, useState } from "react";
import Catg from "./Catg";
import Products from "../shopProduct/Products";
import "./style.css";
import axios from "axios";


const Shop = () => {

  const [products, setProduct] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3000/products/").then((response) => {
      if (response.status === 200) {
        setProduct(response.data)
        console.log('>>> đã lấy dữ liệu cho shop', response.data)
      }
    });

  }, [])
  return (
    <>
      <section className="container">
        <div className="container row">
          {/* <div className="col-2 ">
            <Catg />
          </div> */}

          <div className="col">
            <div className="heading">
              <div className=" ms-3">
                <h1 className="text-center fw-bold"> Sản phẩm </h1>
              </div>
              <div className="row">
                <div className="col-10">

                </div>
                <div className="col-2"><a href="/products" className="link-offset-2 link-underline link-underline-opacity-0 float-end me-4 text-se">
                  view all <i className="fa-solid fa-caret-right"></i>
                </a></div>
              </div>
            </div>
            <div className="product-content  row">
              {products.map((item, index) => {
                return (<div key={index} className="col-4">
                  <Products CardBody={true} product={item} /></div>
                )
              })}

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
