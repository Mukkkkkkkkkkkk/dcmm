import React, { Component } from 'react';
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";
import ReactPaginate from 'react-paginate';
import {toast} from "react-toastify";


class NhanVienComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            taiKhoan: [],
            itemsPerPage: 5, // Number of items to display per page
            currentPage: 1,   // Current page

            nhanVienQuyen1: [],
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
        // this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiUsernameAdd = this.thayDoiUsernameAdd.bind(this);
        this.thayDoiEmailAdd = this.thayDoiEmailAdd.bind(this);
        this.thayDoiPasswordAdd = this.thayDoiPasswordAdd.bind(this);
        this.thayDoiAnhAdd = this.thayDoiAnhAdd.bind(this);
        this.thayDoiTrangThaiAdd = this.thayDoiTrangThaiAdd.bind(this);
        // this.thayDoiUsernameUpdate = this.thayDoiUsernameUpdate.bind(this);
        this.thayDoiEmailUpdate = this.thayDoiEmailUpdate.bind(this);
        this.thayDoiPasswordUpdate = this.thayDoiPasswordUpdate.bind(this);
        this.thayDoiAnhUpdate = this.thayDoiAnhUpdate.bind(this);
        this.thayDoiTrangThaiUpdate = this.thayDoiTrangThaiUpdate.bind(this);

    }
    loadQuanLyData(pageNumber) {
        taikhoanservice.getNhanVien(pageNumber)
            .then(response => {
                this.setState({
                    nhanVienQuyen1: response.data,
                    pageCount: response.data.totalPages,
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    handlePageClick = (selectedPage) => {
        const pageNumber = selectedPage.selected + 1; // ReactPaginate uses zero-based indexing
        this.setState({ pageNumber }, () => {
            this.loadQuanLyData(pageNumber);
        });
    };
    handlePageChange = (pageNumber) => {
        this.setState({
            currentPage: pageNumber,
        });
    };
    componentDidMount(pageNumber) {
        taikhoanservice.getNhanVien(pageNumber)
            .then(res => {
                this.setState({
                    nhanVienQuyen1: res.data,
                    pageCount: res.data.totalPages,
                });
            });
        const id = this.props.match.params.id;
        if (id) {
            taikhoanservice.getTaiKhoanById(this.state.id).then((res) => {
                this.setState({ taiKhoanUpdate: res.data });
            })
        }

    }
    add(id) {
        window.location.href = (`/addNhanVien`);

    }

    detail(id) {
        window.location.href = (`/nhanviendetail/${id}`);
    }
    update = (e) => {
        e.preventDefault();
        let nhanVienQuyen1 = {
            username: this.state.taiKhoanUpdate.username,
            email: this.state.taiKhoanUpdate.email,
            // ngayTao: this.state.taiKhoanUpdate.ngayTao,
            // ngayCapNhat: this.state.taiKhoanUpdate.ngayCapNhat,
            password: this.state.taiKhoanUpdate.password,
            anh: this.state.taiKhoanUpdate.anh,
            trangThai: this.state.taiKhoanUpdate.trangThai }

        console.log('nsx' + JSON.stringify(nhanVienQuyen1));
        let id = this.state.taiKhoanUpdate.id;
        ///username
        // const existingUser = this.state.nhanVienQuyen1.find(user => user.username === nhanVienQuyen1.username);
        // if (existingUser) {
        //     this.setState({ errorUpdate: { ...this.state.errorUpdate, username: "Username đã tồn tại!" } });
        //     return;
        // } else if (!this.state.taiKhoanUpdate.username) {
        //     this.setState({ errorUpdate: { ...this.state.errorUpdate, username: "username không được bỏ trống!" } });
        //     return;
        // } else if (!isNaN(this.state.taiKhoanUpdate.username)) {
        //     this.setState({ errorUpdate: { ...this.state.errorUpdate, username: "username phải là chữ!" } });
        //     return;
        // }
        // else {
        //     this.setState({ errorUpdate: { ...this.state.errorUpdate, username: "" } });
        // }
////email
        const existingEmail = this.state.nhanVienQuyen1.find(user => user.email === nhanVienQuyen1.email);
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
        taikhoanservice.updateNhanVien(nhanVienQuyen1, this.state.taiKhoanUpdate.id).then((res) => {
            let taiKhoanCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                nhanVienQuyen1: prevState.nhanVienQuyen1.map(tk =>
                    tk.id === taiKhoanCapNhat.id ? taiKhoanCapNhat : tk
                )
            }));
            toast.success("Sửa thành công!");
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
        });
    }
    thayDoiUsernameAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                username: event.target.value
            }
        }));
        let errorAdd = { ...this.state.errorAdd, username: "" };
        this.setState({ errorAdd: errorAdd });
    }
    thayDoiEmailAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                email: event.target.value
            }
        }));
        let errorAdd = { ...this.state.errorAdd, email: "" };
        this.setState({ errorAdd: errorAdd });
    }

    thayDoiPasswordAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                password: event.target.value
            }
        }));
        let errorAdd = { ...this.state.errorAdd, password: "" };
        this.setState({ errorAdd: errorAdd });
    }
    thayDoiAnhAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                anh: event.target.value
            }
        }));
        let errorAdd = { ...this.state.errorAdd, anh: "" };
        this.setState({ errorAdd: errorAdd });
    }

    thayDoiTrangThaiAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                trangThai: event.target.value
            }
        }));
        let errorAdd = { ...this.state.errorAdd, trangThai: "" };
        this.setState({ errorAdd: errorAdd });
    }
    ///////

    thayDoiEmailUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                email: event.target.value
            }
        }));
        let errorUpdate = { ...this.state.errorUpdate, email: "" };
        this.setState({ errorUpdate: errorUpdate });
    }

    thayDoiPasswordUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                password: event.target.value
            }
        }));
        let errorUpdate = { ...this.state.errorUpdate, password: "" };
        this.setState({ errorUpdate: errorUpdate });
    }
    thayDoiAnhUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                anh: event.target.value
            }
        }));
        let errorUpdate = { ...this.state.errorUpdate, anh: "" };
        this.setState({ errorUpdate: errorUpdate });
    }

    thayDoiTrangThaiUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                trangThai: event.target.value
            }
        }));
        let errorUpdate = { ...this.state.errorUpdate, trangThai: "" };
        this.setState({ errorUpdate: errorUpdate });
    }

    toggleTaiKhoan(id, currentTaiKhoan) {
        const newTrangThai = currentTaiKhoan === false ? true : false; // Chuyển đổi trạng thái
        taikhoanservice.updateTaiKhoanTrangThai({ trangThai: newTrangThai }, id).then((res) => {
            let taiKhoanCapNhat = res.data;
            this.setState(prevState => ({
                nhanVienQuyen1: prevState.nhanVienQuyen1.map(tk =>
                    tk.id === taiKhoanCapNhat.id ? taiKhoanCapNhat : tk
                )
            }));
        });
    }
    render() {
        const {nhanVienQuyen1, itemsPerPage, currentPage } = this.state;

        // Calculate the start and end indexes for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentItems = nhanVienQuyen1.slice(startIndex, endIndex);
        return (
            <div>
                <div className="pagetitle">
                    <h1>Nhân viên</h1>
                    <nav>
                        {/*<ol className="breadcrumb">*/}
                        {/*    <li className="breadcrumb-item"><a href="index.html">Home</a></li>*/}
                        {/*    <li className="breadcrumb-item active">Overview</li>*/}
                        {/*    <li className="breadcrumb-item active">Color</li>*/}
                        {/*</ol>*/}
                    </nav>
                </div>


                <section className="section dashboard">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">


                                        <div className="card-body">
                                            <h5 className="card-title">Danh sách nhân viên <span>| </span></h5>
                                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                <button onClick={this.add} className='btn btn-success'>
                                                    Tạo tài khoản
                                                </button>
                                            </div>
                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>Ngày tạo</th>
                                                    <th>Ngày cập nhật</th>
                                                    <th>Ảnh</th>
                                                    <th>Trạng thái</th>
                                                    {/*<th>Thông tin người dùng</th>*/}
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                {currentItems.map((tk, index) => (
                                                    <tr key={tk.id}>
                                                        <td>{tk.username}</td>
                                                        <td>{tk.email}</td>
                                                        <td>{tk.ngayTao}</td>
                                                        <td>{tk.ngayCapNhat}</td>
                                                        <td>
                                                            {tk.anh && <img src={`/niceadmin/img/${tk.anh}`} width="100px" height="100px" />}

                                                        </td>
                                                        <td>{tk.trangThai == true ? "Hoạt động" : "Ngừng hoạt động"}</td>
                                                        <td><label className="switch">
                                                            <input
                                                                type="checkbox"
                                                                checked={tk.trangThai === true}
                                                                onChange={() => this.toggleTaiKhoan(tk.id, tk.trangThai)}
                                                            />

                                                            <span className="slider round"></span>
                                                        </label></td>

                                                        {/*<td>  <button onClick={() => this.delete(tk.id)} className='btn btn-danger'>Delete</button>  </td>*/}
                                                        <td> <button onClick={() => this.detail(tk.id)} className='btn btn-primary'>Detail</button></td>

                                                    </tr>
                                                ))}


                                                </tbody>
                                            </table>
                                            {/* Pagination component */}
                                            <ul className="pagination justify-content-center">
                                                {Array.from({ length: Math.ceil(nhanVienQuyen1.length / itemsPerPage) }, (_, i) => (
                                                    <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                                        <button
                                                            className="page-link"
                                                            onClick={() => this.handlePageChange(i + 1)}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>


                                </div>

                            </div>

                        </div>


                        {/*<div className="col-lg-4">*/}


                        {/*    <div className="card">*/}

                        {/*        <div className="card-body">*/}
                        {/*            <h5 className="card-title">Sửa <span>| xx</span></h5>*/}

                        {/*            <ul className="nav nav-tabs" id="myTab" role="tablist">*/}
                        {/*                <li className="nav-item" role="presentation">*/}
                        {/*                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab"*/}
                        {/*                            data-bs-target="#home" type="button" role="tab" aria-controls="home"*/}
                        {/*                            aria-selected="true">Edit*/}
                        {/*                    </button>*/}
                        {/*                </li>*/}
                        {/*                <li className="nav-item" role="presentation">*/}
                        {/*                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab"*/}
                        {/*                            data-bs-target="#profile" type="button" role="tab" aria-controls="profile"*/}
                        {/*                            aria-selected="false">Add new*/}
                        {/*                    </button>*/}
                        {/*                </li>*/}
                        {/*                <li className="nav-item" role="presentation">*/}
                        {/*                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab"*/}
                        {/*                            data-bs-target="#contact" type="button" role="tab" aria-controls="contact"*/}
                        {/*                            aria-selected="false">Detail*/}
                        {/*                    </button>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}


                        {/*            <div className="tab-content pt-2" id="myTabContent">*/}
                        {/*                <div className="tab-pane fade show active" id="home" role="tabpanel"*/}
                        {/*                     aria-labelledby="home-tab">*/}
                        {/*                    <form>*/}

                        {/*                        <div>*/}
                        {/*                            UserName:*/}
                        {/*                            <div>*/}
                        {/*                             <span className={`form-control ${this.state.errorUpdate.username ? 'is-invalid' : ''}`}>*/}
                        {/*                                 {this.state.taiKhoanUpdate.username}*/}
                        {/*                                 </span>*/}
                        {/*                            </div>*/}

                        {/*                        </div>*/}
                        {/*                        <div>*/}
                        {/*                            Email :*/}
                        {/*                            <input className={`form-control ${this.state.errorUpdate.email ? 'is-invalid' : ''}`} name="email" style={{}} value={this.state.taiKhoanUpdate.email} onChange={this.thayDoiEmailUpdate} />*/}
                        {/*                            {this.state.errorUpdate.email && <div className="text-danger">{this.state.errorUpdate.email}</div>}*/}

                        {/*                        </div>*/}
                        {/*                        <div>*/}
                        {/*                            PassWord :*/}
                        {/*                            <input className={`form-control ${this.state.errorUpdate.password ? 'is-invalid' : ''}`} name="password"   style={{}} value={this.state.taiKhoanUpdate.password} onChange={this.thayDoiPasswordUpdate} />*/}
                        {/*                            {this.state.errorUpdate.password && <div className="text-danger">{this.state.errorUpdate.password}</div>}*/}

                        {/*                        </div>*/}
                        {/*                        <div>*/}
                        {/*                            Ảnh :*/}
                        {/*                            <input className={`form-control ${this.state.errorUpdate.anh? 'is-invalid' : ''}`} name="anh" style={{}} value={this.state.taiKhoanUpdate.anh} onChange={this.thayDoiAnhUpdate} />*/}
                        {/*                            {this.state.errorUpdate.anh && <div className="text-danger">{this.state.errorUpdate.anh}</div>}*/}

                        {/*                        </div>*/}
                        {/*                        <div className='form-group'>*/}
                        {/*                            <label>Trạng thái</label>*/}
                        {/*                            <select name="trangThai" id="trangThai" value={this.state.taiKhoanUpdate.trangThai} className={`form-control ${this.state.errorUpdate.trangThai ? 'is-invalid' : ''}`} onChange={this.thayDoiTrangThaiUpdate}>*/}
                        {/*                                <option value=''>Chọn trạng thái</option>*/}
                        {/*                                <option value="true">Hoạt động</option>*/}
                        {/*                                <option value="false">Không hoạt động</option>*/}
                        {/*                            </select>*/}
                        {/*                            {this.state.errorUpdate.trangThai && <div className="text-danger">{this.state.errorUpdate.trangThai}</div>}*/}
                        {/*                        </div>*/}
                        {/*                        <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />*/}
                        {/*                    </form>*/}
                        {/*                </div>*/}

                        {/*                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">*/}
                        {/*                    <form>*/}

                        {/*                        <div>*/}
                        {/*                            UserName :*/}
                        {/*                            <input className={`form-control ${this.state.errorAdd.username ? 'is-invalid' : ''}`} name="username" style={{}} value={this.state.taiKhoanAdd.username} onChange={this.thayDoiUsernameAdd} />*/}
                        {/*                            {this.state.errorAdd.username && <div className="text-danger">{this.state.errorAdd.username}</div>}*/}

                        {/*                        </div>*/}
                        {/*                        <div>*/}
                        {/*                            Email :*/}
                        {/*                            <input className={`form-control ${this.state.errorAdd.email ? 'is-invalid' : ''}`} name="email" style={{}} value={this.state.taiKhoanAdd.email} onChange={this.thayDoiEmailAdd} />*/}
                        {/*                            {this.state.errorAdd.email && <div className="text-danger">{this.state.errorAdd.email}</div>}*/}

                        {/*                        </div>*/}
                        {/*                        <div>*/}
                        {/*                            PassWord :*/}
                        {/*                            <input className={`form-control ${this.state.errorAdd.password ? 'is-invalid' : ''}`} name="password"   style={{}} value={this.state.taiKhoanAdd.password} onChange={this.thayDoiPasswordAdd} />*/}
                        {/*                            {this.state.errorAdd.password && <div className="text-danger">{this.state.errorAdd.password}</div>}*/}

                        {/*                        </div>*/}
                        {/*                        <div>*/}
                        {/*                            Ảnh :*/}

                        {/*                            <input className={`form-control ${this.state.errorAdd.anh ? 'is-invalid' : ''}`} type={"file"}  name="anh"  style={{}} value={this.state.taiKhoanAdd.anh} onChange={this.thayDoiAnhAdd} />*/}
                        {/*                            {this.state.errorAdd.anh && <div className="text-danger">{this.state.errorAdd.anh}</div>}*/}

                        {/*                        </div>*/}
                        {/*                        <div className='form-group'>*/}
                        {/*                            <label>Trạng thái</label>*/}
                        {/*                            <select name="trangThai" id="trangThai" className={`form-control ${this.state.errorAdd.trangThai ? 'is-invalid' : ''}`} onChange={this.thayDoiTrangThaiAdd}>*/}
                        {/*                                <option value=''>Chọn trạng thái</option>*/}
                        {/*                                <option value="true">Hoạt động</option>*/}
                        {/*                                <option value="false">Không hoạt động</option>*/}
                        {/*                            </select>*/}
                        {/*                            {this.state.errorAdd.trangThai && <div className="text-danger">{this.state.errorAdd.trangThai}</div>}*/}
                        {/*                        </div>*/}
                        {/*                        <input type="submit" className="btn btn-primary" value="Add" style={{ marginTop: '10px' }} onClick={this.add} />*/}
                        {/*                    </form>*/}
                        {/*                </div>*/}


                        {/*                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">*/}
                        {/*                    <form className="row g-3" method="get">*/}
                        {/*                        <div className="form-group">*/}
                        {/*                            /!* ID : ${mau.id} *!/*/}
                        {/*                        </div>*/}
                        {/*                        <div className="form-group">*/}
                        {/*                            /!* Name : ${mau.name} *!/*/}
                        {/*                        </div>*/}

                        {/*                    </form>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}


                        {/*        </div>*/}





                    </div>

                </section>
            </div>
        );
    }
}

export default NhanVienComponent;