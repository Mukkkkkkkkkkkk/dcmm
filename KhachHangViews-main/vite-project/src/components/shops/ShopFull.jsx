import React from "react";
import Catg from "./Catg";
import Products from "../shopProduct/Products";
import "./style.css";
import Pagination from 'react-bootstrap/Pagination';

const ShopFull = () => {
  return (
    <>
      <section className="container">
        <div className="container row pt-5">
          <div className="col-3 ">
            <Catg />
          </div>

          <div className="col-9">

            <div className="product-content  row">
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>
              <div className="col-4 p-0 m-0">
                <Products CardBody={true} />
              </div>


            </div>
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopFull;
