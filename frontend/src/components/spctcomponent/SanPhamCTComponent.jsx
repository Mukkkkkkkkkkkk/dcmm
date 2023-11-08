import React, { Component } from 'react';
import SanPhamChiTietService from "../../services/spctservice/SanPhamChiTietService";
import ReactPaginate from 'react-paginate';

class SanPhamCTComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            sanPhamChiTiet: [],
            sanPham: [],
            kichThuocMS: [],
            pageCount: 0,
            sanPhamChiTietAdd: {
                soLuong: '',
                trangThai: '',
                sanPhamId: '',
                kichThuocMauSacId: ''
            },
            sanPhamChiTietUpdate: {
                soLuong: '',
                trangThai: '',
                sanPhamId: '',
                kichThuocMauSacId: ''
            },
            errorAdd: {
                soLuong: '',
                trangThai: '',
                sanPhamId: '',
                kichThuocMauSacId: ''
            },
            errorUpdate: {
                soLuong: '',
                trangThai: '',
                sanPhamId: '',
                kichThuocMauSacId: ''
            }
        }
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiSoLuongAdd = this.thayDoiSoLuongAdd.bind(this);
        this.thayDoiSanPhamAdd = this.thayDoiSanPhamAdd.bind(this);
        this.thayDoiKichThuocMauSacAdd = this.thayDoiKichThuocMauSacAdd.bind(this);
        this.thayDoiTrangThaiAdd = this.thayDoiTrangThaiAdd.bind(this);
        this.thayDoiSoLuongUpdate = this.thayDoiSoLuongUpdate.bind(this);
        this.thayDoiSanPhamUpdate = this.thayDoiSanPhamUpdate.bind(this);
        this.thayDoiKichThuocMauSacUpdate = this.thayDoiKichThuocMauSacUpdate.bind(this);
        this.thayDoiTrangThaiUpdate = this.thayDoiTrangThaiUpdate.bind(this);
    }

    loadPageData(pageNumber) {
        SanPhamChiTietService.getSanPhamChiTiet(pageNumber).then(res => {
            this.setState({
                sanPhamChiTiet: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
    }

    handlePageClick = data => {
        let selected = data.selected; // Trang được chọn từ react-paginate
        this.loadPageData(selected);
    };

    componentDidMount(pageNumber) {
        SanPhamChiTietService.getKTMS().then((res) => {
            this.setState({ kichThuocMS: res.data.content });
        })
        SanPhamChiTietService.getSanPham().then((res) => {
            this.setState({ sanPham: res.data.content });
        })
        SanPhamChiTietService.getSanPhamChiTiet(pageNumber).then(res => {
            this.setState({
                sanPhamChiTiet: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
        const id = this.props.match.params.id;
        if (id) {
            SanPhamChiTietService.getSanPhamChiTietById(this.state.id).then((res) => {
                this.setState({ sanPhamChiTietUpdate: res.data });
            })
        }
    }
    delete(id) {
        SanPhamChiTietService.deleteSanPhamChiTiet(id).then((res) => {
        });
        window.location.href = (`/sanphamchitiet`);
    }
    add = (e) => {
        e.preventDefault();
        let soLuong = parseInt(this.state.sanPhamChiTietAdd.soLuong);
        if (!this.state.sanPhamChiTietAdd.soLuong.trim()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, soLuong: "Số lượng không được bỏ trống!" } });
            return;
        } else if (!soLuong >= 0) {
            this.setState({ errorAdd: { ...this.state.errorAdd, soLuong: "Số lượng không được bé hơn 0 !" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, soLuong: "" } });
        }
        SanPhamChiTietService.addSanPhamChiTiet(this.state.sanPhamChiTietAdd).then((res) => {
            window.location.href = (`/sanphamchitiet`);
        })

    }
    update = (e) => {
        e.preventDefault();
        var spct = {
            soLuong: this.state.sanPhamChiTietUpdate.soLuong,
            trangThai: this.state.sanPhamChiTietUpdate.trangThai,
            sanPhamId: this.state.sanPhamChiTietUpdate.sanPhamId,
            kichThuocMauSacId: this.state.sanPhamChiTietUpdate.kichThuocMauSacId
        }
        let soLuong = parseInt(this.state.sanPhamChiTietUpdate.soLuong);
        if (!this.state.sanPhamChiTietUpdate.soLuong.trim()) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, soLuong: "Số lượng không được bỏ trống!" } });
            return;
        } else if (!soLuong >= 0) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, soLuong: "Số lượng không được bé hơn 0 !" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, soLuong: "" } });
        }
        console.log('nsx' + JSON.stringify(spct));
        let id = this.state.sanPhamChiTietUpdate.id;
        SanPhamChiTietService.updateSanPhamChiTiet(id, spct).then((res) => {
            window.location.href = (`/sanphamchitiet`);
        })
    }
    detail(id) {
        window.location.href = (`/sanphamchitietdetail/${id}`);
    }
    thayDoiSoLuongAdd = (event) => {
        this.setState(
            prevState => ({
                sanPhamChiTietAdd: {
                    ...prevState.sanPhamChiTietAdd,
                    soLuong: event.target.value
                }
            })
        );
        let errorAdd = { ...this.state.errorAdd, soLuong: "" };
        this.setState({ errorAdd: errorAdd });
    }
    thayDoiSanPhamAdd = (event) => {
        this.setState(
            prevState => ({
                sanPhamChiTietAdd: {
                    ...prevState.sanPhamChiTietAdd,
                    sanPhamId: event.target.value
                }
            })
        );
    }
    thayDoiKichThuocMauSacAdd = (event) => {
        this.setState(
            prevState => ({
                sanPhamChiTietAdd: {
                    ...prevState.sanPhamChiTietAdd,
                    kichThuocMauSacId: event.target.value
                }
            })
        );
    }
    thayDoiTrangThaiAdd = (event) => {
        this.setState(
            prevState => ({
                sanPhamChiTietAdd: {
                    ...prevState.sanPhamChiTietAdd,
                    trangThai: event.target.value
                }
            })
        );

    }
    thayDoiSoLuongUpdate = (event) => {
        this.setState(
            prevState => ({
                sanPhamChiTietUpdate: {
                    ...prevState.sanPhamChiTietUpdate,
                    soLuong: event.target.value
                }
            })
        );
        let errorUpdate = { ...this.state.errorUpdate, soLuong: "" };
        this.setState({ errorUpdate: errorUpdate });
    }
    thayDoiSanPhamUpdate = (event) => {
        this.setState(
            prevState => ({
                sanPhamChiTietUpdate: {
                    ...prevState.sanPhamChiTietUpdate,
                    sanPhamId: event.target.value
                }
            })
        );
    }
    thayDoiKichThuocMauSacUpdate = (event) => {
        this.setState(
            prevState => ({
                sanPhamChiTietUpdate: {
                    ...prevState.sanPhamChiTietUpdate,
                    kichThuocMauSacId: event.target.value
                }
            })
        );
    }
    thayDoiTrangThaiUpdate = (event) => {
        this.setState(
            prevState => ({
                sanPhamChiTietUpdate: {
                    ...prevState.sanPhamChiTietUpdate,
                    trangThai: event.target.value
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
                                                        <th>Sản phẩm</th>
                                                        <th>Màu sắc</th>
                                                        <th>Kích thước</th>
                                                        <th>Số lượng</th>
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
                                                        this.state.sanPhamChiTiet.map(
                                                            spct =>
                                                                <tr key={spct.id}>
                                                                    <td>{spct.sanPhamId.ten}</td>
                                                                    <td>{spct.kichThuocMauSacId.mauSac.ten}</td>
                                                                    <td>{spct.kichThuocMauSacId.kichThuoc.giaTri}</td>
                                                                    <td>{spct.soLuong}</td>
                                                                    <td>{spct.trangThai === 1 ? "HD" : "Ko HD"}</td>
                                                                    <td>
                                                                        <button onClick={() => this.delete(spct.id)} className='btn btn-danger'>Xóa</button>
                                                                        <button onClick={() => this.detail(spct.id)} className='btn btn-primary'>Chi tiết</button>
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
                                                    Sản phẩm :
                                                    <select className="form-control" value={this.state.sanPhamChiTietUpdate.sanPhamId} onChange={this.thayDoiSanPhamUpdate}>
                                                        {this.state.sanPham.map(
                                                            sp =>
                                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div>
                                                    Kích thước và màu sắc :
                                                    <select className="form-control" value={this.state.sanPhamChiTietUpdate.kichThuocMauSacId} onChange={this.thayDoiKichThuocMauSacUpdate}>
                                                        {this.state.kichThuocMS.map(
                                                            ktms =>
                                                                <option key={ktms.id} value={ktms.id} >{ktms.mauSac.ten} Size {ktms.kichThuoc.giaTri}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div>
                                                    Số lượng :
                                                    <input className={`form-control ${this.state.errorUpdate.soLuong ? 'is-invalid' : ''}`} id="soLuongAdd" style={{}} value={this.state.sanPhamChiTietUpdate.soLuong} onChange={this.thayDoiSoLuongUpdate} />
                                                    {this.state.errorUpdate.soLuong && <div className="text-danger">{this.state.errorUpdate.soLuong}</div>}

                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" className="form-control" onChange={this.thayDoiTrangThaiUpdate}>
                                                        <option value="1">Còn</option>
                                                        <option value="0">Ko còn</option>
                                                    </select>
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    Sản phẩm :
                                                    <select className="form-control" onChange={this.thayDoiSanPhamAdd}>
                                                        {this.state.sanPham.map(
                                                            sp =>
                                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div>
                                                    Kích thước và màu sắc :
                                                    <select className="form-control" onChange={this.thayDoiKichThuocMauSacAdd}>
                                                        {this.state.kichThuocMS.map(
                                                            ktms =>
                                                                <option key={ktms.id} value={ktms.id} >{ktms.mauSac.ten} Size {ktms.kichThuoc.giaTri}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div>
                                                    Số lượng :
                                                    <input className={`form-control ${this.state.errorAdd.soLuong ? 'is-invalid' : ''}`} id="soLuongAdd" onChange={this.thayDoiSoLuongAdd} />
                                                    {this.state.errorAdd.soLuong && <div className="text-danger">{this.state.errorAdd.soLuong}</div>}
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" className="form-control" onChange={this.thayDoiTrangThaiAdd}>
                                                        <option value="1">Còn</option>
                                                        <option value="0">Ko còn</option>
                                                    </select>
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.add} />
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

export default SanPhamCTComponent;