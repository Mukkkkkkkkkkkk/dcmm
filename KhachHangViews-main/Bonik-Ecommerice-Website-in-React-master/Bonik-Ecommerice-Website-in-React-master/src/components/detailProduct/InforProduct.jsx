import { useState } from "react";
import ProductData from "./ProductData";

const InforProduct = () => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Lấy thông tin sản phẩm từ ProductData
    const product = ProductData;

    // Kiểm tra xem sản phẩm đã tồn tại trong localStorage chưa
    const existingProducts = localStorage.getItem("cartItems");
    if (existingProducts) {
      // Nếu đã tồn tại, lấy danh sách sản phẩm từ localStorage và chuyển sang kiểu mảng
      const cartItems = JSON.parse(existingProducts);

      // Kiểm tra xem sản phẩm đã tồn tại trong danh sách chưa
      const existingProductIndex = cartItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, chỉ cần cập nhật số lượng
        cartItems[existingProductIndex].quantity += quantity;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm vào danh sách
        cartItems.push({
          ...product,
          quantity: quantity,
        });
      }

      // Lưu danh sách sản phẩm vào localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      // Nếu chưa có danh sách sản phẩm, tạo mới và lưu vào localStorage
      const cartItems = [
        {
          ...product,
          quantity: quantity,
        },
      ];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    // Hiển thị thông báo hoặc chuyển hướng đến trang giỏ hàng (tuỳ ý)
  };
  return (
    <>
      <div className="content-right mt-5">
        <h1>
          <strong>{ProductData.ten}</strong>
        </h1>
        <div className="row">
          <div className="col-6">
            <span>Mã sản phẩm: {ProductData.maSP}</span>
          </div>
          <div className="col-6">
            <span>Tình trạng: {ProductData.tinhTrang}</span>
          </div>
          <div className="col-6">
            <span>Hãng: {ProductData.hang}</span>
          </div>
          <div className="col-6">
            <span>Dòng: {ProductData.dong}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <br />
            <h3>
              <strong style={{ color: "orange" }}>{ProductData.gia} VND</strong>
            </h3>
          </div>
        </div>
        <hr className="dashed-hr" />
        <span>{ProductData.moTa}</span>
        <hr className="dashed-hr" />
        <div className="row">
          {ProductData.mauSac.map((item, index) => {
            return (
              <div className="col-1 ms-1 mb-3" key={item.idMauSac}>
                <a href="#">
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: item.value,
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
            <div className="accordion" id="accordionExample3">
              <div className="accordion-item">
                <h1 className="accordion-header" id="headingOne3">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne3"
                    aria-expanded="true"
                    aria-controls="collapseOne3"
                  >
                    <strong className="font-monospace">Kích Thước</strong>
                  </button>
                </h1>
                <div
                  id="collapseOne3"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne3"
                  data-bs-parent="#accordionExample3"
                >
                  <div className="accordion-body row">
                    {ProductData.kichThuoc.map((item, index) => {
                      return (
                        <div className="col-3 mb-3" key={item.idKichThuoc}>
                          <a href="#" className="btn btn-sm btn-outline-dark">
                            <div>{item.value}</div>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="form-floating mb-3 border-0">
              <input
                type="number"
                min="0"
                max={ProductData.conLai}
                className="form-control"
                name="formId1"
                id="formId1"
                placeholder="Số Lượng"
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
              <i class="fa-regular fa-heart fs-5"></i>
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
