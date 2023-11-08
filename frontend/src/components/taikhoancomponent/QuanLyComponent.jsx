import React, { Component } from 'react';
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";
import ReactPaginate from 'react-paginate';
import {toast} from "react-toastify";


class QuanLyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            taiKhoan: [],
            itemsPerPage: 5, // Number of items to display per page
            currentPage: 1,   // Current page
            files : null,
            nhanVienQuyen2: [],
            thongTinNguoiDung:[],
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
        this.thayDoiUsernameUpdate = this.thayDoiUsernameUpdate.bind(this);
        this.thayDoiEmailUpdate = this.thayDoiEmailUpdate.bind(this);
        this.thayDoiPasswordUpdate = this.thayDoiPasswordUpdate.bind(this);
        this.thayDoiAnhUpdate = this.thayDoiAnhUpdate.bind(this);
        this.thayDoiTrangThaiUpdate = this.thayDoiTrangThaiUpdate.bind(this);

    }
    loadQuanLyData(pageNumber) {
        taikhoanservice.getQuanLy(pageNumber)
            .then(response => {
                this.setState({
                    nhanVienQuyen2: response.data,
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
        taikhoanservice.getQuanLy(pageNumber)
            .then(res => {
                this.setState({
                    nhanVienQuyen2: res.data,
                    pageCount: res.data.totalPages,
                });
            });
        const id = this.props.match.params.id;
        if (id) {
            taikhoanservice.getTaiKhoanById(this.state.id).then((res) => {
                this.setState({ taiKhoanUpdate: res.data });
            })
        }
        this.loadQuanLyData(1);
    }
    add(id) {
        window.location.href = (`/addQuanLy`);

    }

    detail(id) {
        window.location.href = (`/quanlydetail/${id}`);
    }
    update = (e) => {
        e.preventDefault();
        let nhanVienQuyen2 = {
            username: this.state.taiKhoanUpdate.username,
            email: this.state.taiKhoanUpdate.email,
            // ngayTao: this.state.taiKhoanUpdate.ngayTao,
            // ngayCapNhat: this.state.taiKhoanUpdate.ngayCapNhat,
            password: this.state.taiKhoanUpdate.password,
            anh: this.state.taiKhoanUpdate.anh,
            trangThai: this.state.taiKhoanUpdate.trangThai }

        console.log('nsx' + JSON.stringify(nhanVienQuyen2));
        let id = this.state.taiKhoanUpdate.id;
        ///username
        // const existingUser = this.state.nhanVienQuyen2.find(user => user.username === nhanVienQuyen2.username);
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
        const existingEmail = this.state.nhanVienQuyen2.find(user => user.email === nhanVienQuyen2.email);
        if (existingEmail) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, email: "Email đã tồn tại!" }});
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
        taikhoanservice.updateQuanLy(nhanVienQuyen2, this.state.taiKhoanUpdate.id).then((res) => {
            let taiKhoanCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                nhanVienQuyen2: prevState.nhanVienQuyen2.map(tk =>
                    tk.id === taiKhoanCapNhat.id ? taiKhoanCapNhat : tk
                )
            }));
            toast.success("Sửa thành công!"); // Thông báo thành công
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


    thayDoiTrangThaiUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                trangThai: event.target.value
            }
        }));
    }
    thayDoiUsernameUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                username: event.target.value
            }
        }));
        let errorUpdate = { ...this.state.errorUpdate, username: "" };
        this.setState({ errorUpdate: errorUpdate });
    }
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
    imageStyle = {
        width: '100%', // Hình ảnh chiếm toàn bộ chiều rộng của box
        height: '100%', // Tính tỷ lệ chiều cao tự động
    };
    toggleTaiKhoan(id, currentTaiKhoan) {
        const newTrangThai = currentTaiKhoan === false ? true : false; // Chuyển đổi trạng thái
        taikhoanservice.updateTaiKhoanTrangThai({ trangThai: newTrangThai }, id).then((res) => {
            let taiKhoanCapNhat = res.data;
            this.setState(prevState => ({
                nhanVienQuyen2: prevState.nhanVienQuyen2.map(tk =>
                    tk.id === taiKhoanCapNhat.id ? taiKhoanCapNhat : tk
                )
            }));
        });
    }
    render() {
        const {nhanVienQuyen2, itemsPerPage, currentPage } = this.state;

        // Calculate the start and end indexes for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentItems = nhanVienQuyen2.slice(startIndex, endIndex);
        return (
            <div>
                <div className="pagetitle">
                    <h1>Quản lý</h1>
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
                                            <h5 className="card-title">Danh sách quản lý <span>| </span></h5>
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
                                                    <th>Thông tin người dùng</th>
                                                    <th>Trạng thái</th>
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
                                                            <img
                                                                src={'/niceadmin/img/'+ tk.anh}// Thay đổi đường dẫn hình ảnh của bạn ở đây
                                                                alt={"Hình ảnh"}
                                                                style={this.imageStyle}
                                                            />

                                                        </td>
                                                        <td>{tk.thongTinNguoiDung.ten}</td>
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
                                                {Array.from({ length: Math.ceil(nhanVienQuyen2.length / itemsPerPage) }, (_, i) => (
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






                    </div>

                </section>
            </div>
        );
    }
}

export default QuanLyComponent;