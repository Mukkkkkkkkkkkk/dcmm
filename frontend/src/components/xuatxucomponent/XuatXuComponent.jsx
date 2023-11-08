import React, { Component } from 'react';
import xuatxuservice from '../../services/xuatxuservice/xuatxuservice';
import { toast } from 'react-toastify';
import ReactPaginate from "react-paginate";


class XuatXuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xuatXu: [],
            pageCount: 0,
            xuatXuAdd: {
                ten: '',
                trangThai: '',
            },
            xuatXuUpdate: {
                id: this.props.match.params.id,
                ten: '',
                trangThai: '',
            },
            errorsAdd: {
                ten: '',
                trangThai: ''
            },
            errorsUpdate: {
                ten: '',
                trangThai: ''
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
        this.loadXuatXuData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadXuatXuData();
        }
    }

    loadXuatXuData(pageNumber) {
        xuatxuservice.getXuatXu(pageNumber).then(res => {
            this.setState({
                xuatXu: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });

        const id = this.props.match.params.id;
        if (id) {
            xuatxuservice.getXuatXuById(id).then((res) => {
                this.setState({ xuatXuUpdate: res.data });
            });
        }
    }

    loadPageData(pageNumber) {
        xuatxuservice.getXuatXu(pageNumber).then(res => {
            this.setState({
                xuatXu: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
    }

    handlePageClick = data => {
        let selected = data.selected; // Trang được chọn từ react-paginate
        this.loadPageData(selected);
    };


    delete(id) {
        xuatxuservice.deleteXuatXu(id).then((res) => {
            this.setState({ xuatXu: this.state.xuatXu.filter(xuatXu => xuatXu.id != id) });
        });
    }
    add = (e) => {
        e.preventDefault();
        if (!this.state.xuatXuAdd.ten.trim()) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, ten: "Tên không được bỏ trống!" } });
            return;
        }else if (!isNaN(this.state.xuatXuAdd.ten.trim())) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, ten: "Tên phải là chữ" } });
            return;
        }else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, ten: "" } });
        }
    
        if (!this.state.xuatXuAdd.trangThai.trim()) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, trangThai: "Trạng thái không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, trangThai: "" } });
        }


        let xuatXu = { ten: this.state.xuatXuAdd.ten, trangThai: this.state.xuatXuAdd.trangThai }
        xuatxuservice.createXuatXu(xuatXu).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let xuatXuMoi = res.data;
                this.setState(prevState => ({
                    xuatXu: [...prevState.xuatXu, xuatXuMoi]
                }));

                toast.success("Thêm thành công!"); // Thông báo thành công

            } else {
                // Xử lý khi có lỗi
                const errorMessage = res.data || "Có lỗi xảy ra khi thêm danh mục.";
                toast.error("Lỗi: " + errorMessage); // Hiển thị lỗi bằng Toast
                console.log(errorMessage);
            }
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
            toast.error("Lỗi: " + error.data); // Hiển thị lỗi bằng Toast
        });
    }

    update = (e) => {
        e.preventDefault();
        let xuatXu = { giaTri: this.state.xuatXuUpdate.giaTri, ten: this.state.xuatXuUpdate.ten, trangThai: this.state.xuatXuUpdate.trangThai }
        console.log('nsx' + JSON.stringify(xuatXu));
        let id = this.state.xuatXuUpdate.id;

        if (!this.state.xuatXuUpdate.ten.trim()) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ten: "Tên không được bỏ trống!" } });
            return;
        }else if (!isNaN(this.state.xuatXuUpdate.ten.trim())) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ten: "Tên phải là chữ!" } });
            return;
        }
            else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ten: "" } });
        }


        if (!this.state.xuatXuUpdate.trangThai) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, trangThai: "Trạng thái không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, trangThai: "" } });
        }

        xuatxuservice.updateXuatXu(xuatXu, this.state.xuatXuUpdate.id).then((res) => {
            let xuatXuCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                xuatXu: prevState.xuatXu.map(th =>
                    th.id === xuatXuCapNhat.id ? xuatXuCapNhat : th
                )
            }));
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
        });

    }
    detail(id) {
        window.location.href = (`/xuatXudetail/${id}`);
    }

    thayDoiTenAdd = (event) => {
        this.setState(prevState => ({
            xuatXuAdd: {
                ...prevState.xuatXuAdd,
                ten: event.target.value
            }
        }));
    }

    thayDoiTrangThaiAdd = (event) => {
        this.setState(prevState => ({
            xuatXuAdd: {
                ...prevState.xuatXuAdd,
                trangThai: event.target.value
            }
        }));
    }
    thayDoiTenUpdate = (event) => {
        this.setState(prevState => ({
            xuatXuUpdate: {
                ...prevState.xuatXuUpdate,
                ten: event.target.value
            }
        }));
    }
    thayDoiTrangThaiUpdate = (event) => {
        this.setState(prevState => ({
            xuatXuUpdate: {
                ...prevState.xuatXuUpdate,
                trangThai: event.target.value
            }
        }));
    }

    toggleXuatXu(id, currentTrangThai) {
        const newTrangThai = currentTrangThai === 0 ? 1 : 0; // Chuyển đổi trạng thái
        xuatxuservice.updateXuatXuTrangThai({ trangThai: newTrangThai }, id).then((res) => {
            let xuatXuCapNhat = res.data;
            this.setState(prevState => ({
                xuatXu: prevState.xuatXu.map(xx =>
                    xx.id === xuatXuCapNhat.id ? xuatXuCapNhat : xx
                )
            }));
        });
    }


    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Xuất xứ</h1>
                    <nav>
                        <ol className="breadcrumb">
                            {/*<li className="breadcrumb-item"><a href="index.html">Home</a></li>*/}
                            {/*<li className="breadcrumb-item active">Overview</li>*/}
                            {/*<li className="breadcrumb-item active">Color</li>*/}
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
                                            <h5 className="card-title">Danh sách xuất xứ <span>| </span></h5>
                                            <table className="table datatable table-borderless ">
                                                <thead>
                                                    <tr>
                                                        <th>Xuất xứ</th>
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
                                                        this.state.xuatXu.map(
                                                            xx =>
                                                                <tr key={xx.id}>
                                                                    <td>{xx.ten}</td>
                                                                    <td><label className="switch">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={xx.trangThai === 0}
                                                                            onChange={() => this.toggleXuatXu(xx.id, xx.trangThai)}
                                                                        />

                                                                        <span className="slider round"></span>
                                                                    </label></td>
                                                                    <td>
                                                                        {/*<button onClick={() => this.delete(xx.id)} className='btn btn-danger'>Xóa</button>*/}
                                                                        <button onClick={() => this.detail(xx.id)} className='btn btn-primary'>Chi tiết</button>
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
                                        {/*<li className="nav-item" role="presentation">*/}
                                        {/*    <button className="nav-link" id="contact-tab" data-bs-toggle="tab"*/}
                                        {/*        data-bs-target="#contact" type="button" role="tab" aria-controls="contact"*/}
                                        {/*        aria-selected="false">Detail*/}
                                        {/*    </button>*/}
                                        {/*</li>*/}
                                    </ul>


                                    <div className="tab-content pt-2" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                                            aria-labelledby="home-tab">
                                            <form>
                                                <div>
                                                    Tên :
                                                    <input
                                                        className={`form-control ${this.state.errorsUpdate.ten ? 'is-invalid' : ''}`}
                                                        name="ten"
                                                        onChange={this.thayDoiTenUpdate}
                                                        value={this.state.xuatXuUpdate.ten}
                                                    />
                                                    {this.state.errorsUpdate.ten && <div className="text-danger">{this.state.errorsUpdate.ten}</div>}
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select
                                                        name="trangThai"
                                                        id="trangThai"
                                                        value={this.state.xuatXuUpdate.trangThai}
                                                        className={`form-control ${this.state.errorsUpdate.trangThai ? 'is-invalid' : ''}`}
                                                        onChange={this.thayDoiTrangThaiUpdate}
                                                    >
                                                        <option value=''>Chọn trạng thái</option>
                                                        <option value="0">Hoạt động</option>
                                                        <option value="1">Không hoạt động</option>
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
                                                    <input
                                                        className={`form-control ${this.state.errorsAdd.ten ? 'is-invalid' : ''}`}
                                                        name="ten"
                                                        // value={this.state.xuatXuUpdate.ten}
                                                        onChange={this.thayDoiTenAdd}
                                                    />
                                                    {this.state.errorsAdd.ten && <div className="text-danger">{this.state.errorsAdd.ten}</div>}
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select
                                                        name="trangThai"
                                                        id="trangThai"
                                                        // value={this.state.xuatXuUpdate.trangThai}
                                                        className={`form-control ${this.state.errorsAdd.trangThai ? 'is-invalid' : ''}`}
                                                        onChange={this.thayDoiTrangThaiAdd}
                                                    >
                                                        <option value=''>Chọn trạng thái</option>
                                                        <option value="0">Hoạt động</option>
                                                        <option value="1">Không hoạt động</option>
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
export default XuatXuComponent