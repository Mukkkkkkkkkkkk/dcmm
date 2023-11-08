import React, { Component } from 'react';
import phanquyenservice from "../../services/PhanQuyen/phanquyenservice";
import ReactPaginate from 'react-paginate';

class PhanQuyenComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            phanQuyen: [],
            taiKhoan: [],
            quyen: [],
            pageCount: 0,
            phanQuyenAdd: {
                taiKhoanId: '',
                quyenId: '',
            },
            phanQuyenUpdate: {
                taiKhoanId: '',
                quyenId: '',
            },
            errorAdd: {
                taiKhoanId: '',
                quyenId: '',
            },
            errorUpdate: {
                taiKhoanId: '',
                quyenId: '',
            }
        }
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiTaiKhoanAdd = this.thayDoiTaiKhoanAdd.bind(this);
        this.thayDoiQuyenAdd = this.thayDoiQuyenAdd.bind(this);
        this.thayDoiTaiKhoanUpdate = this.thayDoiTaiKhoanUpdate.bind(this);
        this.thayDoiQuyenUpdate = this.thayDoiQuyenUpdate.bind(this);
    }

    loadPageData(pageNumber) {
        phanquyenservice.getPhanQuyen(pageNumber).then(res => {
            this.setState({
                phanQuyen: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
    }

    handlePageClick = data => {
        let selected = data.selected; // Trang được chọn từ react-paginate
        this.loadPageData(selected);
    };

    componentDidMount(pageNumber) {
        phanquyenservice.getTaiKhoan().then((res) => {
            this.setState({ taiKhoan: res.data.content });
        })
        phanquyenservice.getQuyen().then((res) => {
            this.setState({ quyen: res.data.content });
        })
        phanquyenservice.getPhanQuyen(pageNumber).then(res => {
            this.setState({
                phanQuyen: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
        const id = this.props.match.params.id;
        if (id) {
            phanquyenservice.getPhanQuyenById(this.state.id).then((res) => {
                this.setState({ phanQuyenUpdate: res.data });
            })
        }
    }
    delete(id) {
        phanquyenservice.deletePhanQuyen(id).then((res) => {
        });
        window.location.href = (`/phanquyen`);
    }
    add = (e) => {
        e.preventDefault();
        let phanQuyen = {
            taiKhoanId: this.state.phanQuyenAdd.taiKhoan,
            quyenId: this.state.phanQuyenAdd.quyen
        }
        if (!this.state.phanQuyenAdd.taiKhoanId) {
            this.setState({ errorAdd: { ...this.state.errorAdd, taiKhoanId: "Tai khoann không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, taiKhoanId: "" } });
        }
        if (!this.state.phanQuyenAdd.quyenId) {
            this.setState({ errorAdd: { ...this.state.errorAdd, quyenId: "Quyèn không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, quyenId: "" } });
        }
        phanquyenservice.addPhanQuyen(phanQuyen).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let phanQuyenMoi = res.data;
                this.setState(prevState => ({
                    phanQuyen: [...prevState.phanQuyen, phanQuyenMoi]
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
        var phanQuyen = {
            taiKhoanId: this.state.phanQuyenUpdate.taiKhoan,
            quyenId : this.state.phanQuyenUpdate.quyen
        }
        console.log('nsx' + JSON.stringify(phanQuyen));
        let id = this.state.phanQuyenUpdate.id;
        if (!this.state.phanQuyenUpdate.taiKhoanId) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, taiKhoanId: "Tai khoann không được bỏ trống!" } });
            return;
        } else {
            this.setState({errorUpdate: { ...this.state.errorUpdate, taiKhoanId: "" } });
        }
        if (!this.state.phanQuyenUpdate.quyenId) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, quyenId: "Quyèn không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, quyenId: "" } });
        }

        phanquyenservice.updatePhanQuyen(phanQuyen,this.state.phanQuyenUpdate.id).then((res) => {
            let phanQuyenCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                phanQuyen: prevState.phanQuyen.map(pq =>
                    pq.id === phanQuyenCapNhat.id ? phanQuyenCapNhat : pq
                )
            }));
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
        });
    }
    detail(id) {
        window.location.href = (`/phanquyendetail/${id}`);
    }

    thayDoiTaiKhoanAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    taiKhoanId: event.target.value
                }
            })
        );
    }
    thayDoiQuyenAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    quyenId: event.target.value
                }
            })
        );
    }

    thayDoiTaiKhoanUpdate = (event) => {
        this.setState(
            prevState => ({
                taiKhoanUpdate: {
                    ...prevState.taiKhoanUpdate,
                    taiKhoanId: event.target.value
                }
            })
        );
    }
    thayDoiQuyenUpdate = (event) => {
        this.setState(
            prevState => ({
                taiKhoanUpdate: {
                    ...prevState.taiKhoanUpdate,
                    quyenId: event.target.value
                }
            })
        );
    }


    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Color</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Overview</li>
                            <li className="breadcrumb-item active">Color</li>
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
                                            <h5 className="card-title">Color <span>| </span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>Tài khoản</th>
                                                    <th>Quyền</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.phanQuyen.map(
                                                        pq =>
                                                            <tr key={pq.id}>
                                                                <td>{pq.taiKhoan.username}</td>
                                                                <td>{pq.quyen.ten}</td>
                                                                <td>
                                                                    <button onClick={() => this.delete(pq.id)} className='btn btn-danger'>Xóa</button>
                                                                    <button onClick={() => this.detail(pq.id)} className='btn btn-primary'>Chi tiết</button>
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
                                                    Tài khoản:
                                                    <select  name="taiKhoan"  className="form-control" value={this.state.phanQuyenUpdate.taiKhoanId} className={`form-control ${this.state.errorUpdate.taiKhoanId ? 'is-invalid' : ''}`} onChange={this.thayDoiTaiKhoanUpdate}>
                                                        {this.state.taiKhoan.map(
                                                            tk =>
                                                                <option key={tk.id} value={tk.id}>{tk.username}</option>
                                                        )}
                                                    </select>

                                                </div>
                                                <div>
                                                    Quyền :
                                                    <select name="quyen"   className="form-control" value={this.state.phanQuyenUpdate.quyenId} className={`form-control ${this.state.errorUpdate.taiKhoanId ? 'is-invalid' : ''}`} onChange={this.thayDoiQuyenUpdate}>
                                                        {this.state.quyen.map(
                                                            q =>
                                                                <option key={q.id} value={q.id} >{q.ten}</option>
                                                        )}
                                                    </select>
                                                    {/*{this.state.errorUpdate.quyen && <div className="text-danger">{this.state.errorUpdate.quyen}</div>}*/}
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    Tài khoản:
                                                    <select className="form-control"  name="taiKhoanId"   onChange={this.thayDoiTaiKhoanAdd}>
                                                        {this.state.taiKhoan.map(
                                                            tk =>
                                                                <option key={tk.id} value={tk.id}>{tk.username}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div>
                                                    Quyền:
                                                    <select className="form-control"  name="quyenId"   onChange={this.thayDoiQuyenAdd}>
                                                        {this.state.quyen.map(
                                                            q =>
                                                                <option key={q.id} value={q.id}>{q.ten}</option>
                                                        )}
                                                    </select>
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

export default PhanQuyenComment;