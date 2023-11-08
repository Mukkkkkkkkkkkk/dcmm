import React, { useEffect, useState } from "react";
import FlashCard from "./FlashCard";
import "./style.css";
import axios from "axios";

const FlashDeals = () => {

  const [products, setProduct] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3000/products/").then((response) => {
      if (response.status === 200) {
        setProduct(response.data)
        console.log('>>> đã lấy dữ liệu cho flass deal', response.data)
      }
    });

  }, [])
  return (
    <>
      <section className="flash">
        <div className="container">

          <FlashCard products={products} />
        </div>
      </section>
    </>
  );
};

export default FlashDeals;
