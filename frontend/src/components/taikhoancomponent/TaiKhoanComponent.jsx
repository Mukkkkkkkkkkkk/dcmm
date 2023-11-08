import React, { Component } from 'react';
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";
import ReactPaginate from 'react-paginate';
import thuonghieuservice from "../../services/thuonghieuservice/thuonghieuservice";

class TaiKhoanComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            taiKhoan: [],
            pageCount: 0,
            taiKhoanAdd: {
                username: '',
                email: '',
                // ngayTao: '',
                // ngayCapNhat: '',
                password: '',
                anh: '',
                trangThai: ''
            },
            taiKhoanUpdate: {
                id: this.props.match.params.id,
                username: '',
                email: '',
                // ngayTao: '',
                // ngayCapNhat: '',
                password: '',
                anh: '',
                trangThai: ''
            },
            errorAdd: {
                username: '',
                email: '',
                // ngayTao: '',
                // ngayCapNhat: '',
                password: '',
                anh: '',
                trangThai: ''
            },
            errorUpdate: {
                username: '',
                email: '',
                // ngayTao: '',
                // ngayCapNhat: '',
                password: '',
                anh: '',
                trangThai: ''
            }
        }
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiUsernameAdd = this.thayDoiUsernameAdd.bind(this);
        this.thayDoiEmailAdd = this.thayDoiEmailAdd.bind(this);
        this.thayDoiPasswordAdd = this.thayDoiPasswordAdd.bind(this);
        this.thayDoiAnhAdd = this.thayDoiAnhAdd.bind(this);
        this.thayDoiTrangThaiAdd = this.thayDoiTrangThaiAdd.bind(this);
        this.thayDoiUsernameUpdate = this.thayDoiUsernameUpdate.bind(this);
        this.thayDoiEmailUpdate = this.thayDoiEmailUpdate.bind(this);
        this.thayDoiPasswordUpdate = this.thayDoiPasswordUpdate.bind(this);
        this.thayDoiAnhUpdate = this.thayDoiAnhUpdate.bind(this);
        this.thayDoiTrangThaiUpdate = this.thayDoiTrangThaiUpdate.bind(this);
    }

    loadPageData(pageNumber) {
        taikhoanservice.getTaiKhoan(pageNumber).then(res => {
            this.setState({
                taiKhoan: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
    }

    handlePageClick = data => {
        let selected = data.selected; // Trang được chọn từ react-paginate
        this.loadPageData(selected);
    };

    componentDidMount(pageNumber) {
        taikhoanservice.getTaiKhoan(pageNumber).then(res => {
            this.setState({
                taiKhoan: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
        const id = this.props.match.params.id;
        if (id) {
            taikhoanservice.getTaiKhoanById(this.state.id).then((res) => {
                this.setState({ taiKhoanUpdate: res.data });
            })
        }
    }
    delete(id) {
        taikhoanservice.deleteTaiKhoan(id).then((res) => {
            this.setState({ taiKhoan: this.state.taiKhoan.filter(taiKhoan => taiKhoan.id != id) });
        });
    }
    add = (e) => {
        e.preventDefault();
        let taiKhoan = {
            username: this.state.taiKhoanAdd.username,
            email: this.state.taiKhoanAdd.email,
            // ngayTao: this.state.taiKhoanAdd.ngayTao,
            // ngayCapNhat: this.state.taiKhoanAdd.ngayCapNhat,
            password: this.state.taiKhoanAdd.password,
            anh: this.state.taiKhoanAdd.anh,
            trangThai: this.state.taiKhoanAdd.trangThai
        }
        ///username
        const existingUser = this.state.taiKhoan.find(user => user.username === taiKhoan.username);
        if (existingUser) {
            this.setState({ errorAdd: { ...this.state.errorAdd, username: "Username đã tồn tại!" } });
            return;
        } else if (!this.state.taiKhoanAdd.username) {
            this.setState({ errorAdd: { ...this.state.errorAdd, username: "username không được bỏ trống!" } });
            return;
        } else if (!isNaN(this.state.taiKhoanAdd.username)) {
            this.setState({ errorAdd: { ...this.state.errorAdd, username: "username phải là chữ!" } });
            return;
        }
        else {
            this.setState({ errorAdd: { ...this.state.errorAdd, username: "" } });
        }
////email
        const existingEmail = this.state.taiKhoan.find(user => user.email === taiKhoan.email);
        if (existingEmail) {
            this.setState({ errorAdd: { ...this.state.errorAdd, email: "Email đã tồn tại!" } });
            return;
        }else if (!this.state.taiKhoanAdd.email) {
            this.setState({ errorAdd: { ...this.state.errorAdd, email: "Email không được bỏ trống!" } });
            return;
        } else if (!isValidEmail(this.state.taiKhoanAdd.email)) {
            this.setState({ errorAdd: { ...this.state.errorAdd, email: "Email không hợp lệ!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, email: "" } });
        }
        function isValidEmail(email) {
            const emailPattern = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
            return emailPattern.test(email);
        }
        ///pass
        if (!this.state.taiKhoanAdd.password) {
            this.setState({ errorAdd: { ...this.state.errorAdd, password: "Password không thể bỏ trống!" } });
            return;
        } else if (/\s/.test(this.state.taiKhoanAdd.password)) {
            this.setState({ errorAdd: { ...this.state.errorAdd, password: "Password không được chứa khoảng trắng!" } });
            return;
        } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.state.taiKhoanAdd.password)) {
            this.setState({ errorAdd: { ...this.state.errorAdd, password: "Password phải chứa ít nhất một ký tự đặc biệt!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, password: "" } });
        }
        ///anh
        if (!this.state.taiKhoanAdd.anh) {
            this.setState({ errorAdd: { ...this.state.errorAdd, anh: "Ảnh không được bỏ trống!" } });
            return;
        }
        else {
            this.setState({ errorAdd: { ...this.state.errorAdd, anh: "" } });
        }
        //trangthai
        if (!this.state.taiKhoanAdd.trangThai) {
            this.setState({errorAdd: { ...this.state.errorAdd, trangThai: "Trạng thái không được bỏ trống!" } });
            return;
        }
        else {
            this.setState({ errorAdd: { ...this.state.errorAdd, trangThai: "" } });
        }
        //trangthai

        taikhoanservice.addTaiKhoan(taiKhoan).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let taiKhoanMoi = res.data;
                this.setState(prevState => ({
                    taiKhoan: [...prevState.taiKhoan, taiKhoanMoi]
                }));
            } else {
                // Xử lý khi có lỗi
                const errorMessage = res.data || "Có lỗi xảy ra khi thêm danh mục.";
                alert("lỗi" + errorMessage) // Hiển thị lỗi bằng Toast
                console.log(errorMessage);
            }
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
        })


    }
    update = (e) => {
        e.preventDefault();
        let taiKhoan = {
            username: this.state.taiKhoanUpdate.username,
            email: this.state.taiKhoanUpdate.email,
            // ngayTao: this.state.taiKhoanUpdate.ngayTao,
            // ngayCapNhat: this.state.taiKhoanUpdate.ngayCapNhat,
            password: this.state.taiKhoanUpdate.password,
            anh: this.state.taiKhoanUpdate.anh,
            trangThai: this.state.taiKhoanUpdate.trangThai }

        console.log('nsx' + JSON.stringify(taiKhoan));
        let id = this.state.taiKhoanUpdate.id;
        ///username
        const existingUser = this.state.taiKhoan.find(user => user.username === taiKhoan.username);
        if (existingUser) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, username: "Username đã tồn tại!" } });
            return;
        } else if (!this.state.taiKhoanUpdate.username) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, username: "username không được bỏ trống!" } });
            return;
        } else if (!isNaN(this.state.taiKhoanUpdate.username)) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, username: "username phải là chữ!" } });
            return;
        }
        else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, username: "" } });
        }
////email
        const existingEmail = this.state.taiKhoan.find(user => user.email === taiKhoan.email);
        if (existingEmail) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, email: "Email đã tồn tại!" } });
            return;
        }else if (!this.state.taiKhoanUpdate.email) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, email: "Email không được bỏ trống!" } });
            return;
        } else if (!isValidEmail(this.state.taiKhoanUpdate.email)) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, email: "Email không hợp lệ!" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, email: "" } });
        }
        function isValidEmail(email) {
            const emailPattern = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
            return emailPattern.test(email);
        }
        ///pass
        if (!this.state.taiKhoanUpdate.password) {
            this.setState({errorUpdate: { ...this.state.errorUpdate, password: "Password không thể bỏ trống!" } });
            return;
        } else if (/\s/.test(this.state.taiKhoanUpdate.password)) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, password: "Password không được chứa khoảng trắng!" } });
            return;
        } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.state.taiKhoanUpdate.password)) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, password: "Password phải chứa ít nhất một ký tự đặc biệt!" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, password: "" } });
        }
        ///anh
        if (!this.state.taiKhoanUpdate.anh) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, anh: "Ảnh không được bỏ trống!" } });
            return;
        }
        else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, anh: "" } });
        }
        //trangthai
        if (!this.state.taiKhoanUpdate.trangThai) {
            this.setState({errorUpdate: { ...this.state.errorUpdate, trangThai: "Trạng thái không được bỏ trống!" } });
            return;
        }
        else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, trangThai: "" } });
        }
        taikhoanservice.updateTaiKhoan(taiKhoan, this.state.taiKhoanUpdate.id).then((res) => {
            let taiKhoanCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                taiKhoan: prevState.taiKhoan.map(tk =>
                    tk.id === taiKhoanCapNhat.id ? taiKhoanCapNhat : tk
                )
            }));
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
        });
    }
    detail(id) {
        window.location.href = (`/taikhoandetail/${id}`);
    }
    thayDoiUsernameAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                username: event.target.value
            }
        }));
    }
    thayDoiEmailAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                email: event.target.value
            }
        }));
    }

    thayDoiPasswordAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                password: event.target.value
            }
        }));
    }
    thayDoiAnhAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                anh: event.target.value
            }
        }));
    }

    thayDoiTrangThaiAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                trangThai: event.target.value
            }
        }));
    }
    ///////
    thayDoiUsernameUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                username: event.target.value
            }
        }));
    }
    thayDoiEmailUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                email: event.target.value
            }
        }));
    }

    thayDoiPasswordUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                password: event.target.value
            }
        }));
    }
    thayDoiAnhUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                anh: event.target.value
            }
        }));
    }

    thayDoiTrangThaiUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                trangThai: event.target.value
            }
        }));
    }
    toggleTaiKhoan(id, currentTaiKhoan) {
        const newTrangThai = currentTaiKhoan === false ? true : false; // Chuyển đổi trạng thái
        taikhoanservice.updateTaiKhoanTrangThai({ trangThai: newTrangThai }, id).then((res) => {
            let taiKhoanCapNhat = res.data;
            this.setState(prevState => ({
                taiKhoan: prevState.taiKhoan.map(tk =>
                    tk.id === taiKhoanCapNhat.id ? taiKhoanCapNhat : tk
                )
            }));
        });
    }
    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Color</h1>
                    {/*<nav>*/}
                    {/*    <ol className="breadcrumb">*/}
                    {/*        <li className="breadcrumb-item"><a href="index.html">Home</a></li>*/}
                    {/*        <li className="breadcrumb-item active">Overview</li>*/}
                    {/*        <li className="breadcrumb-item active">Color</li>*/}
                    {/*    </ol>*/}
                    {/*</nav>*/}
                </div>


                <section className="section dashboard">
                    <div className="row">

                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">


                                        <div className="card-body">
                                            {/*<h5 className="card-title">Color <span>| </span></h5>*/}

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>Ngày tạo</th>
                                                    <th>Ngày cập nhật</th>
                                                    <th>Ảnh</th>
                                                    <th>Trạng thái</th>
                                                    <th>Thông tin</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.taiKhoan.map(
                                                        tk =>
                                                            <tr key={tk.id}>
                                                                <td>{tk.username}</td>
                                                                <td>{tk.email}</td>
                                                                <td>{tk.ngayTao}</td>
                                                                <td>{tk.ngayCapNhat}</td>

                                                                <td>
                                                                    {tk.anh && <img src={`/niceadmin/img/${tk.anh}`} width="100px" height="100px" />}

                                                                </td>
                                                                <td><label className="switch">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={tk.trangThai === true}
                                                                        onChange={() => this.toggleTaiKhoan(tk.id, tk.trangThai)}
                                                                    />

                                                                    <span className="slider round"></span>
                                                                </label></td>
                                                                {/*<td>{tk.thongTinNguoiDung.ten}</td>*/}
                                                                <td>
                                                                    {/*<button onClick={() => this.delete(tk.id)} className='btn btn-danger'>Xóa</button>*/}
                                                                    <button onClick={() => this.detail(tk.id)} className='btn btn-primary'>Chi tiết</button>
                                                                </td>
                                                            </tr>
                                                    )
                                                }
                                                </tbody>


                                            </table>
                                            <ReactPaginate
                                                previousLabel={"<"}
                                                nextLabel={">"}
                                                breakLabel={"..."}
                                                breakClassName={"page-item"}
                                                breakLinkClassName={"page-link"}
                                                pageClassName={"page-item"}
                                                pageLinkClassName={"page-link"}
                                                previousClassName={"page-item"}
                                                previousLinkClassName={"page-link"}
                                                nextClassName={"page-item"}
                                                nextLinkClassName={"page-link"}
                                                pageCount={this.state.pageCount}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={this.handlePageClick}
                                                containerClassName={"pagination justify-content-center"} // added justify-content-center for center alignment
                                                activeClassName={"active"}
                                            />
                                        </div>
                                    </div>


                                </div>

                            </div>

                        </div>


                        <div className="col-lg-4">


                            <div className="card">

                                <div className="card-body">
                                    <h5 className="card-title">Sửa <span>| xx</span></h5>

                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab"
                                                    data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                                    aria-selected="true">Edit
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab"
                                                    data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                                    aria-selected="false">Add new
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="contact-tab" data-bs-toggle="tab"
                                                    data-bs-target="#contact" type="button" role="tab" aria-controls="contact"
                                                    aria-selected="false">Detail
                                            </button>
                                        </li>
                                    </ul>


                                    <div className="tab-content pt-2" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                                             aria-labelledby="home-tab">
                                            <form>

                                                <div>
                                                    UserName :
                                                    <input className={`form-control ${this.state.errorUpdate.username ? 'is-invalid' : ''}`} name="username" style={{}} value={this.state.taiKhoanUpdate.username} onChange={this.thayDoiUsernameUpdate} />
                                                    {this.state.errorUpdate.username && <div className="text-danger">{this.state.errorUpdate.username}</div>}

                                                </div>
                                                <div>
                                                    Email :
                                                    <input className={`form-control ${this.state.errorUpdate.email ? 'is-invalid' : ''}`} name="email" style={{}} value={this.state.taiKhoanUpdate.email} onChange={this.thayDoiEmailUpdate} />
                                                    {this.state.errorUpdate.email && <div className="text-danger">{this.state.errorUpdate.email}</div>}

                                                </div>
                                                <div>
                                                    PassWord :
                                                    <input className={`form-control ${this.state.errorUpdate.password ? 'is-invalid' : ''}`} name="password"   style={{}} value={this.state.taiKhoanUpdate.password} onChange={this.thayDoiPasswordUpdate} />
                                                    {this.state.errorUpdate.password && <div className="text-danger">{this.state.errorUpdate.password}</div>}

                                                </div>
                                                <div>
                                                    Ảnh :
                                                    <label  className={`form-control ${this.state.errorUpdate.anh? 'is-invalid' : ''}`} name="anh" style={{}} value={this.state.taiKhoanUpdate.anh} ></label>
                                                    <input className={`form-control ${this.state.errorUpdate.anh? 'is-invalid' : ''}`} type={"file"}   onChange={this.thayDoiAnhUpdate} />
                                                    {this.state.errorUpdate.anh && <div className="text-danger">{this.state.errorUpdate.anh}</div>}

                                                </div>
                                                <div className='form-group'>
                                                    <label><span style={{color: "red"}}>*</span>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" value={this.state.taiKhoanUpdate.trangThai} className={`form-control ${this.state.errorUpdate.trangThai ? 'is-invalid' : ''}`} onChange={this.thayDoiTrangThaiUpdate}>
                                                        <option value="">Chọn trạng thái</option>
                                                        <option value="true">Hoạt động</option>
                                                        <option value="false">Không hoạt động</option>
                                                    </select>
                                                    {this.state.errorUpdate.trangThai && <div className="text-danger">{this.state.errorUpdate.trangThai}</div>}
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>

                                                <div>
                                                    UserName :
                                                    <input className={`form-control ${this.state.errorAdd.username ? 'is-invalid' : ''}`} name="username" style={{}} value={this.state.taiKhoanAdd.username} onChange={this.thayDoiUsernameAdd} />
                                                    {this.state.errorAdd.username && <div className="text-danger">{this.state.errorAdd.username}</div>}

                                                </div>
                                                <div>
                                                    Email :
                                                    <input className={`form-control ${this.state.errorAdd.email ? 'is-invalid' : ''}`} name="email" style={{}} value={this.state.taiKhoanAdd.email} onChange={this.thayDoiEmailAdd} />
                                                    {this.state.errorAdd.email && <div className="text-danger">{this.state.errorAdd.email}</div>}

                                                </div>
                                                <div>
                                                    PassWord :
                                                    <input className={`form-control ${this.state.errorAdd.password ? 'is-invalid' : ''}`} name="password"   style={{}} value={this.state.taiKhoanAdd.password} onChange={this.thayDoiPasswordAdd} />
                                                    {this.state.errorAdd.password && <div className="text-danger">{this.state.errorAdd.password}</div>}

                                                </div>
                                                <div>
                                                    Ảnh :

                                                    <input className={`form-control ${this.state.errorAdd.anh ? 'is-invalid' : ''}`} type={"file"}  name="anh"  style={{}} value={this.state.taiKhoanAdd.anh} onChange={this.thayDoiAnhAdd} />
                                                    {this.state.errorAdd.anh && <div className="text-danger">{this.state.errorAdd.anh}</div>}

                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" className={`form-control ${this.state.errorAdd.trangThai ? 'is-invalid' : ''}`} onChange={this.thayDoiTrangThaiAdd}>
                                                        <option value=''>Chọn trạng thái</option>
                                                        <option value="true">Hoạt động</option>
                                                        <option value="false">Không hoạt động</option>
                                                    </select>
                                                    {this.state.errorAdd.trangThai && <div className="text-danger">{this.state.errorAdd.trangThai}</div>}
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Add" style={{ marginTop: '10px' }} onClick={this.add} />
                                            </form>
                                        </div>


                                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                            <form className="row g-3" method="get">
                                                <div className="form-group">
                                                    {/* ID : ${mau.id} */}
                                                </div>
                                                <div className="form-group">
                                                    {/* Name : ${mau.name} */}
                                                </div>

                                            </form>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>


                    </div>

                </section>
            </div>
        );
    }
}
export default TaiKhoanComponent;