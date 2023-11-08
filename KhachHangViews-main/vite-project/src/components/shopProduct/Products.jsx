import React, { useEffect, useState } from "react";
import "./style.css";

const Products = (props) => {
  const isCardBody = props.CardBody;
  const cardHeight = props.height || "auto"; // Sử dụng props.height nếu có, nếu không thì mặc định là "auto"
  const product = props.product || {
    ten: "sản phẩm không tồn tại",
    maSp: "99999x999",
    moTa: "đang cập nhật",
    hang: "unknow",
    dong: "unknow",
    soLuong: 999999999999,
    mauSac: [
      {
        giaTri: "black",
        idMauSac: 1,
        kichThuoc: [
          {
            giaTri: "0",
            idKichThuoc: 1
          },
          {
            giaTri: "0",
            idKichThuoc: 2
          },
          {
            giaTri: "0",
            idKichThuoc: 3
          }
        ]
      }
    ],
    giamGia: "100%",
    tinhTrang: "Không tồn tại",
    hinhAnh: [
      {
        url: "../images/shoes/shoe-1-1.avif"
      },
      {
        url: "../images/shoes/shoe-1-2.avif"
      },
      {
        url: "../images/shoes/shoe-1-3.avif"
      },
      {
        url: "../images/shoes/shoe-1-4.avif"
      }
    ],
    giaBan: 127812003,
    id: "0"
  };
  const [isFavorite, setIsFavorite] = useState(false);

  // Effect để kiểm tra và cập nhật trạng thái yêu thích từ localStorage
  useEffect(() => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favoritesFromStorage.includes(product.id));
  }, [product.id]);

  // Hàm xử lý sự kiện khi nhấn nút yêu thích
  const handleToggleFavorite = () => {
    console.log("Clicked");
    console.log("isFavorite before:", isFavorite);

    const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = [...favoritesFromStorage];

    if (isFavorite) {
      const index = updatedFavorites.indexOf(product.id);
      if (index !== -1) {
        updatedFavorites.splice(index, 1);
        setIsFavorite(false);
      }
    } else {
      updatedFavorites.push(product.id);
      setIsFavorite(true);
    }

    console.log("Updated favorites:", updatedFavorites);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  return (
    <>
      <div className="card" style={{ height: cardHeight }}>
        <div className="position-relative">
          <img
            className="card-img-top"
            src={product.hinhAnh[1].url}
            alt="Title"
          />
          <div className="position-absolute top-0 end-0 mt-1 me-1">
            <button className="badge bg-danger">{product.tinhTrang}</button>
          </div>

          <div className="position-absolute bottom-0 end-0 mb-1 me-0">
            <a className="btn favorite-button" onClick={handleToggleFavorite}>
              {/* Hiển thị biểu tượng yêu thích thích ứng với trạng thái */}
              {isFavorite ? (
                <i className="fa-solid fa-heart fs-2" title="Yêu thích"></i>
              ) : (
                <i className="fa-regular fa-heart fs-2" title="Yêu thích"></i>
              )}
            </a>
          </div>

          <div className="position-absolute bottom-0 start-0 mb-1 ms-1 shopBtn">
            <a href={"/product/" + product.id} className="btn btn-primary">
              Mua Ngay!
            </a>
          </div>
        </div>

        {isCardBody === true ? (
          <div className="card-body text-center">
            <h5 className="card-title">
              <strong>{product.ten}</strong>
            </h5>
            <h6 className="card-text">{product.hang} - {product.dong}</h6>
            <h6 className="card-text">{product.giaBan} VND</h6>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Products;
