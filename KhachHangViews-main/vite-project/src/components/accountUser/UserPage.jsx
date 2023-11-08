import "./style.css";
import React, { useState } from "react";
const UserPage = () => {
  const [confirmChanges, setConfirmChanges] = useState(false);

  const handleConfirmChanges = () => {
    const userConfirmed = window.confirm("Bạn có chắc muốn thay đổi thông tin không?");
    
    if (userConfirmed) {
      // Thực hiện thay đổi thông tin
      setConfirmChanges(true);
    } else {
      // Người dùng đã chọn hủy, không thực hiện thay đổi
      setConfirmChanges(false);
    }
  };
  return (
    <>
      <section className="section profile container">
        <div className="">
          <div className="card-body pt-3 ">
            <ul className="nav nav-tabs nav-tabs-bordered">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="profile-edit"
                  aria-controls="thongTinCaNhan"
                >
                  Chỉnh Sửa Hồ Sơ
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="profile-settings"
                  aria-controls="thongTinTaiKhoan"
                >
                  Cài Đặt
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="profile-change-password"
                  aria-controls="giDo"
                >
                  Đổi mật khẩu
                </button>
              </li>
            </ul>
            <div className="tab-content pt-2">
              <div
                className="tab-pane fade show active profile-edit pt-3"
                id="thongTinCaNhan"
                role="tabpanel"
              >
                <h3>Thông tin cá nhân</h3>
                <span>
                  <form className="border mb-3" action="submit">
                    <div className="row mb-3 container">
                      <label
                        htmlFor="profileImage"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Ảnh đại diện
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <img
                          src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=600"
                          alt="Profile"
                        />
                        <div className="pt-2">
                          <a
                            href="#"
                            className="btn btn-success btn-sm"
                            title="Upload new profile image"
                          >
                            <i className="fa-solid fa-upload"></i>{" "}
                          </a>
                          <a
                            href="#"
                            className="btn btn-danger btn-sm"
                            title="Remove my profile image"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3 container">
                      <label
                        htmlFor="fullName"
                        className="col-md-4 col-lg-3 col-form-label"
                        role="tabpanel"
                      >
                        Họ và tên:
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="fullName"
                          type="text"
                          className="form-control"
                          id="fullName"
                          value="Lục Minh Quân"
                        />
                      </div>
                    </div>

                    <div className="row mb-3 container">
                      <label
                        htmlFor="company"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Giới tính
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                          <label class="form-check-label" for="flexRadioDefault1">
                            Nam
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                          <label class="form-check-label" for="flexRadioDefault2">
                            Nữ
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3 container">
                      <label
                        htmlFor="company"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Ngày sinh
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="company"
                          type="date"
                          className="form-control"
                          id="company"
                          value=""
                        />
                      </div>
                    </div>

                    <div className="row mb-3 container">
                      <label
                        htmlFor="Job"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Địa chỉ
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="job"
                          type="text"
                          className="form-control"
                          id="Job"
                          value="Bắc Kạn"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary mb-3"
                        onClick={handleConfirmChanges}
                      >
                        Thay đổi thông tin
                      </button>
                    </div>
                  </form>
                </span>


                <span>
                  <div className="">
                    <h3>Thông tin tài khoản</h3>
                  </div>
                  <form className="border">
                    <div className="row mb-3">
                      <label
                        htmlFor="fullName"
                        className="col-md-4 col-lg-3 col-form-label"
                        role="tabpanel"
                      >
                        Email
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name=""
                          type="email"
                          className="form-control"
                          id=""
                          value="quanlmph20983@fpt.edu.vn "
                        />
                      </div>
                    </div>



                    <div className="row mb-3">
                      <label
                        htmlFor="company"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Mật khẩu
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name=""
                          type="password"
                          className="form-control"
                          id=""
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="Job"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Trạng thái hoạt động:
                      </label>
                      <label
                        htmlFor="Job"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Đang hoạt động
                      </label>
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary mb-3"
                        onClick={handleConfirmChanges}
                      >
                        Thay đổi thông tin
                      </button>
                    </div>


                  </form>
                </span>

                <div className="tab-pane fade pt-3" id="profile-change-password">
                  <form>
                    <div className="row mb-3">
                      <label
                        htmlFor="currentPassword"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Current Password
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="password"
                          type="password"
                          className="form-control"
                          id="currentPassword"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="newPassword"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        New Password
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="newpassword"
                          type="password"
                          className="form-control"
                          id="newPassword"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="renewPassword"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Re-enter New Password
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="renewpassword"
                          type="password"
                          className="form-control"
                          id="renewPassword"
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default UserPage;
