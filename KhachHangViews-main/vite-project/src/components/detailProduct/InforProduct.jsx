import React, { useState } from "react";
import axios from "axios";

import Accordion from "react-bootstrap/Accordion";

const InforProduct = (props) => {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.mauSac[0]);
  const [selectedSize, setSelectedSize] = useState(
    product.mauSac[0].kichThuoc[0]
  );



  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedSize(color.kichThuoc[0]); // Chọn kích thước mặc định của màu sắc đang chọn
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (quantity) => {
    setQuantity(quantity.target.value);
  };
  const handleAddToCart = () => {
    axios.post('http://localhost:3000/cart/', {
      id: product.id,
      soLuong: quantity

    }).then((response) => {
      if (response.status === 201) {
        alert('Added to cart')
      } else {
        alert(' not Added to cart')
      }
    }).catch((error) => { console.log(error) });

  };

  return (
    <>
      <div className="content-right mt-5">
        <h1>
          <strong>{product.ten}</strong>
        </h1>
        <div className="row">
          <div className="col-6">
            <span>Mã sản phẩm: {product.maSP}</span>
          </div>
          <div className="col-6">
            <span>Tình trạng: {product.tinhTrang}</span>
          </div>
          <div className="col-6">
            <span>Hãng: {product.hang}</span>
          </div>
          <div className="col-6">
            <span>Dòng: {product.dong}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <br />
            <h3>
              <strong style={{ color: "orange" }}>{product.giaBan} VND</strong>
            </h3>
          </div>
        </div>
        <hr className="dashed-hr" />
        <span>{product.moTa}</span>
        <hr className="dashed-hr" />
        <div className="row">
          {product.mauSac.map((item, index) => {
            return (
              <div className="col-1 ms-1 mb-3" key={item.idMauSac}>
                <a onClick={() => handleColorChange(item)}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: item.giaTri,
                    }}
                  ></div>
                </a>
              </div>
            );
          })}
        </div>
        <hr className="dashed-hr" />
        <div className="row">
          <div className="col-6">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <strong className="font-monospace">Kích Thước</strong>
                </Accordion.Header>
                <Accordion.Body className=" row">
                  {selectedColor.kichThuoc.map((item, index) => {
                    return (
                      <div
                        className={`col-3 mb-3 ${item === selectedSize ? "selected-size" : ""
                          }`}
                        key={item.idKichThuoc}
                      >
                        <button

                          className={"btn btn-sm btn-outline-dark"}
                          onClick={() => handleSizeChange(item)}
                        >
                          <div>{item.giaTri}</div>
                        </button>
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="col-6">
            <div className="form-floating mb-3 border-0">
              <input
                type="number"
                min="0"
                max={product.soLuong}
                className="form-control"
                name="formId1"
                id="formId1"
                placeholder="Số Lượng"
                onChange={(e) => handleQuantityChange(e)}
              />
              <label htmlFor="formId1" className="font-monospace">
                <strong>Số Lượng :</strong>
              </label>
            </div>
          </div>
        </div>
        <hr className="dashed-hr" />
        <div className="row">
          <div className="col-10">
            <button
              className="btn btn-success btn-lg w-100"
              onClick={handleAddToCart}
            >
              <strong>THÊM VÀO GIỎ HÀNG</strong>
            </button>
          </div>
          <div className="col-2">
            <a
              className="btn favorite-button"
              title="Yêu  thích"
              data-product-id="1"
            >
              <i className="fa-regular fa-heart fs-2"></i>
            </a>
          </div>
          <div className="col-12 mt-2">
            <a href="#" className="btn btn-warning btn-lg w-100">
              <strong>THANH TOÁN</strong>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default InforProduct;
