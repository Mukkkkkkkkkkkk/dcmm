import "./style.css";

const UserPage = () => {
  return (
    <>
      <section className="section profile container">
        <div className="card">
          <div className="card-body pt-3 ">
            <ul className="nav nav-tabs nav-tabs-bordered">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-edit"
                >
                  Chỉnh Sửa Hồ Sơ
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-settings"
                >
                  Cài Đặt
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-change-password"
                >
                  Đổi mật khẩu
                </button>
              </li>
            </ul>
            <div className="tab-content pt-2">
              <div
                className="tab-pane fade show active profile-edit pt-3"
                id="profile-edit"
              >
                <form>
                  <div className="row mb-3">
                    <label
                      for="profileImage"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Profile Image
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
                          <i class="fa-solid fa-upload"></i>{" "}
                        </a>
                        <a
                          href="#"
                          className="btn btn-danger btn-sm"
                          title="Remove my profile image"
                        >
                          <i class="fa-solid fa-trash"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="fullName"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Full Name
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="fullName"
                        type="text"
                        className="form-control"
                        id="fullName"
                        value="Kevin Anderson"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="about"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      About
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <textarea
                        name="about"
                        className="form-control"
                        id="about"
                      >
                        Sunt est soluta temporibus accusantium neque nam maiores
                        cumque temporibus. Tempora libero non est unde veniam
                        est qui dolor. Ut sunt iure rerum quae quisquam autem
                        eveniet perspiciatis odit. Fuga sequi sed ea saepe at
                        unde.
                      </textarea>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="company"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Company
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="company"
                        type="text"
                        className="form-control"
                        id="company"
                        value="Lueilwitz, Wisoky and Leuschke"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="Job"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Job
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="job"
                        type="text"
                        className="form-control"
                        id="Job"
                        value="Web Designer"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="Country"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Country
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="country"
                        type="text"
                        className="form-control"
                        id="Country"
                        value="USA"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="Address"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Address
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="address"
                        type="text"
                        className="form-control"
                        id="Address"
                        value="A108 Adam Street, New York, NY 535022"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="Phone"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Phone
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="phone"
                        type="text"
                        className="form-control"
                        id="Phone"
                        value="(436) 486-3538 x29071"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="Email"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="Email"
                        value="k.anderson@example.com"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="Twitter"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Twitter Profile
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="twitter"
                        type="text"
                        className="form-control"
                        id="Twitter"
                        value="https://twitter.com/#"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="Facebook"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Facebook Profile
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="facebook"
                        type="text"
                        className="form-control"
                        id="Facebook"
                        value="https://facebook.com/#"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="Instagram"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Instagram Profile
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="instagram"
                        type="text"
                        className="form-control"
                        id="Instagram"
                        value="https://instagram.com/#"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="Linkedin"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Linkedin Profile
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="linkedin"
                        type="text"
                        className="form-control"
                        id="Linkedin"
                        value="https://linkedin.com/#"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              <div className="tab-pane fade pt-3" id="profile-settings">
                <form>
                  <div className="row mb-3">
                    <label
                      for="fullName"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Email Notifications
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="changesMade"
                          checked
                        />
                        <label className="form-check-label" for="changesMade">
                          Changes made to your account
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="newProducts"
                          checked
                        />
                        <label className="form-check-label" for="newProducts">
                          Information on new products and services
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="proOffers"
                        />
                        <label className="form-check-label" for="proOffers">
                          Marketing and promo offers
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="securityNotify"
                          checked
                          disabled
                        />
                        <label
                          className="form-check-label"
                          for="securityNotify"
                        >
                          Security alerts
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              <div className="tab-pane fade pt-3" id="profile-change-password">
                <form>
                  <div className="row mb-3">
                    <label
                      for="currentPassword"
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
                      for="newPassword"
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
                      for="renewPassword"
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
      </section>
    </>
  );
};
export default UserPage;
