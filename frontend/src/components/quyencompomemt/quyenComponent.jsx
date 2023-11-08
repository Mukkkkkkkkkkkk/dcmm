import React, { Component } from 'react';
import QuyenService from "../../services/Quyen/QuyenService";

import ReactPaginate from 'react-paginate';
class quyenComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quyen: [],
            pageCount: 0,
            quyenAdd: {
                ten: '',
                trangThai: '',
            },
            quyenUpdate: {
                id: this.props.match.params.id,
                ten: '',
                trangThai: '',
            },
            errorsAdd: {
                ten: '',
                trangThai: '',
            },
            errorsUpdate: {
                ten: '',
                trangThai: '',
            }
        }
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiTenAdd = this.thayDoiTenAdd.bind(this);
        this.thayDoiTrangThaiAdd = this.thayDoiTrangThaiAdd.bind(this);
        this.thayDoiTenUpdate = this.thayDoiTenUpdate.bind(this);
        this.thayDoiTrangThaiUpdate = this.thayDoiTrangThaiUpdate.bind(this);
    }

    componentDidMount() {
        this.loadQuyenData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadQuyenData();
        }
    }

    loadPageData(pageNumber) {
        QuyenService.getQuyen(pageNumber).then(res => {
            this.setState({
                quyen: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
    }

    handlePageClick = data => {
        let selected = data.selected; // Trang được chọn từ react-paginate
        this.loadPageData(selected);
    };

    loadQuyenData(pageNumber) {
        QuyenService.getQuyen(pageNumber).then(res => {
            this.setState({
                quyen: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });

        const id = this.props.match.params.id;
        if (id) {
            QuyenService.getQuyenById(id).then((res) => {
                this.setState({ quyenUpdate: res.data });
            });
        }
    }


    delete(id) {
        QuyenService.deleteQuyen(id).then((res) => {
            this.setState({ quyen: this.state.quyen.filter(quyen => quyen.id != id) });
        });
    }
    add = (e) => {
        e.preventDefault();
        let quyen = {  ten: this.state.quyenAdd.ten,
                     trangThai: this.state.quyenAdd.trangThai }


        if (!this.state.quyenAdd.ten) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, ten: "Tên màu không được bỏ trống!" } });
            return;
        } else if (!isNaN(this.state.quyenAdd.ten)) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, ten: "Tên phải là chữ!" } });
            return;
        }
        else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, ten: "" } });
        }
        if (!this.state.quyenAdd.trangThai) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, trangThai: "Trạng thái không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, trangThai: "" } });
        }

        QuyenService.createQuyen(quyen).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let quyenMoi = res.data;
                this.setState(prevState => ({
                    quyen: [...prevState.quyen, quyenMoi]
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
        });

    }
    update = (e) => {
        e.preventDefault();
        let quyen = {
            ten: this.state.mauSacUpdate.ten,
            trangThai: this.state.mauSacUpdate.trangThai }
        console.log('nsx' + JSON.stringify(quyen));
        let id = this.state.quyenUpdate.id;


        if (!this.state.quyenUpdate.ten) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ten: "Tên màu không được bỏ trống!" } });
            return;
        } else if (!isNaN(this.state.quyenUpdate.ten)) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ten: "Tên phải là chữ!" } });
            return;
        } else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ten: "" } });
        }
        if (!this.state.quyenUpdate.trangThai) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, trangThai: "Trạng thái không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, trangThai: "" } });
        }

        QuyenService.updateQuyen(quyen, this.state.quyenUpdate.id).then((res) => {
            let quyenCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                quyen: prevState.quyen.map(q =>
                    q.id === quyenCapNhat.id ? quyenCapNhat : q
                )
            }));
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
        });

    }
    detail(id) {
        window.location.href = (`/quyendetail/${id}`);
    }

    thayDoiTenAdd = (event) => {
        this.setState(prevState => ({
            quyenAdd: {
                ...prevState.quyenAdd,
                ten: event.target.value
            }
        }));
        let errorsAdd = { ...this.state.errorsAdd, ten: "" };
        this.setState({ errorsAdd: errorsAdd });
    }

    thayDoiTrangThaiAdd = (event) => {
        this.setState(prevState => ({
            quyenAdd: {
                ...prevState.quyenAdd,
                trangThai: event.target.value
            }
        }));
        let errorsAdd = { ...this.state.errorsAdd, trangThai: "" };
        this.setState({ errorsAdd: errorsAdd });
    }

    thayDoiTenUpdate = (event) => {
        this.setState(prevState => ({
            quyenUpdate: {
                ...prevState.quyenUpdate,
                ten: event.target.value
            }
        }));
        let errorsUpdate = { ...this.state.errorsUpdate, ten: "" };
        this.setState({ errorsUpdate: errorsUpdate });
    }
    thayDoiTrangThaiUpdate = (event) => {
        this.setState(prevState => ({
            quyenUpdate: {
                ...prevState.quyenUpdate,
                trangThai: event.target.value
            }
        }));
        let errorsUpdate = { ...this.state.errorsUpdate, trangThai: "" };
        this.setState({ errorsUpdate: errorsUpdate });
    }




    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Quyền</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Overview</li>
                            <li className="breadcrumb-item active">Quyền</li>
                        </ol>
                    </nav>
                </div>


                <section className="section dashboard">
                    <div className="row">

                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">


                                        <div className="card-body">
                                            <h5 className="card-title">Quyền <span>| </span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>Quyền</th>
                                                    <th>Trạng thái</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                {/* </tr>
                                                    <tr>
                                                        <td>${mau.id}</td>
                                                        <td>${mau.name}</td>

                                                        <td>
                                                            <a href="/color/delete/${mau.id}" className="btn btn-danger" onclick="return confirm('Bạn chắc chắn có muốn xóa??')" style="text-decoration: none;color: white"><i className='bx bx-trash'></i></a>
                                                            <a href="/color/detail/${mau.id}" className="btn btn-success" style="text-decoration: none;color: white; margin-top: 5px" ><i className='bi bi-arrow-repeat'></i></a>
                                                        </td>
                                                    </tr> */}
                                                <tbody>
                                                {
                                                    this.state.quyen.map(
                                                        q =>
                                                            <tr key={q.id}>
                                                                <td>{q.ten}</td>
                                                                <td>{q.trangThai == true ? "Hoạt động" : "Không hoạt động"}</td>

                                                            </tr>
                                                    )
                                                }
                                                </tbody>


                                            </table>

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
                                                    Tên :
                                                    <input className={`form-control ${this.state.errorsUpdate.ten ? 'is-invalid' : ''}`} name="ten" value={this.state.quyenUpdate.ten} onChange={this.thayDoiTenUpdate} />
                                                    {this.state.errorsUpdate.ten && <div className="text-danger">{this.state.errorsUpdate.ten}</div>}
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" value={this.state.quyenUpdate.trangThai} className={`form-control ${this.state.errorsUpdate.trangThai ? 'is-invalid' : ''}`} onChange={this.thayDoiTrangThaiUpdate}>
                                                        <option value='true'>Còn</option>
                                                        <option value="false">Ko còn</option>
                                                    </select>
                                                    {this.state.errorsUpdate.trangThai && <div className="text-danger">{this.state.errorsUpdate.trangThai}</div>}
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    Tên :
                                                    <input className={`form-control ${this.state.errorsAdd.ten ? 'is-invalid' : ''}`} name="ten" onChange={this.thayDoiTenAdd} />
                                                    {this.state.errorsAdd.ten && <div className="text-danger">{this.state.errorsAdd.ten}</div>}

                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" className={`form-control ${this.state.errorsAdd.trangThai ? 'is-invalid' : ''}`} onChange={this.thayDoiTrangThaiAdd}>
                                                        <option value='true'>Hoạt động</option>
                                                        <option value="false">Không hoạt động</option>
                                                    </select>
                                                    {this.state.errorsAdd.trangThai && <div className="text-danger">{this.state.errorsAdd.trangThai}</div>}
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
        )
    }

}
export default quyenComponent