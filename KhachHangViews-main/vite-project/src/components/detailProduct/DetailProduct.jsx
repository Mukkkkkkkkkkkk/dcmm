import { useParams } from "react-router-dom";
import ImageProduct from "./ImageProduct";
import InforProduct from "./InforProduct";
import Axios from 'axios';
import Container from "react-bootstrap/Container";
import "./style.css";
import FlashDeals from "../flashDeals/FlashDeals";
import { useEffect, useState } from "react";
const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    ten: "sản phẩm không tồn tại",
    maSp: "99999x999",
    moTa: "đang cập nhật",
    hang: "hang 1",
    dong: "dong 1",
    soLuong: 999999999999,
    mauSac: [
      {
        giaTri: "red",
        idMauSac: 1,
        kichThuoc: [
          {
            giaTri: "41",
            idKichThuoc: 1
          },
          {
            giaTri: "43",
            idKichThuoc: 2
          },
          {
            giaTri: "30",
            idKichThuoc: 3
          }
        ]
      },
      {
        giaTri: "blue",
        idMauSac: 2,
        kichThuoc: [
          {
            giaTri: "31",
            idKichThuoc: 4
          },
          {
            giaTri: "76",
            idKichThuoc: 5
          },
          {
            giaTri: "23",
            idKichThuoc: 6
          }
        ]
      },
      {
        giaTri: "pink",
        idMauSac: 3,
        kichThuoc: [
          {
            giaTri: "45",
            idKichThuoc: 7
          },
          {
            giaTri: "65",
            idKichThuoc: 8
          },
          {
            giaTri: "54",
            idKichThuoc: 9
          }
        ]
      }
    ],
    giamGia: "100%",
    tinhTrang: "Không tồn tại",
    hinhAnh: [
      {
        url: "../images/shoes/test1.png"
      },
      {
        url: "../images/shoes/test2.png"
      },
      {
        url: "../images/shoes/test3.png"
      },
      {
        url: "../images/shoes/test4.png"
      }
    ],
    giaBan: 127812003,
    id: "0"
  });

  useEffect(() => {

    Axios.get("http://localhost:3000/products/" + id).then((response) => {
      if (response.status === 200) {
        setProduct(response.data)
        console.log('>>> đã lấy dữ liệu ', response.data)
      }
    }).catch((error) => { console.error(error) });

  }, [])


  return (
    <div className="pt-5">
      <Container className="mb-5">
        <div className="row">
          <div className="col-6">
            {" "}
            <ImageProduct product={product}></ImageProduct>
          </div>
          <div className="col-6">
            {" "}
            <InforProduct product={product}></InforProduct>
          </div>
        </div>
      </Container>
      <hr className="dashed-hr" />
      <h1 className=" fw-bold text-center">SẢN PHẨM LIÊN QUAN</h1>
      <FlashDeals />
    </div >
  );
};
export default DetailProduct;
