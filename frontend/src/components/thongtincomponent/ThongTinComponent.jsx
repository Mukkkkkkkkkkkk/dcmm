import React, { Component } from 'react';
import xuatxuservice from '../../services/xuatxuservice/xuatxuservice';
import { toast } from 'react-toastify';
import ReactPaginate from "react-paginate";
import thongtinservice from "../../services/thongtinservice/thongtinservice";



class ThongTinComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thongTin: [],
            pageCount: 0,
            thongTinAdd: {
                ten: '',
                diaChi: '',
                sdt: '',
                cccd: '',
                gioiTinh: '',
                ngaySinh: '',
                // ngayCapNhat: '',
            },
            thongTinUpdate: {
                id: this.props.match.params.id,
                ten: '',
                diaChi: '',
                sdt: '',
                cccd: '',
                gioiTinh: '',
                ngaySinh: '',
                // ngayCapNhat: '',
            },
            errorsAdd: {
                ten: '',
                diaChi: '',
                sdt: '',
                cccd: '',
                gioiTinh: '',
                ngaySinh: '',
                // ngayCapNhat: '',
            },
            errorsUpdate: {
                ten: '',
                diaChi: '',
                sdt: '',
                cccd: '',
                gioiTinh: '',
                ngaySinh: '',
                // ngayCapNhat: '',
            }
        }
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiTenAdd = this.thayDoiTenAdd.bind(this);
        this.thayDoiDiaChiAdd = this.thayDoiDiaChiAdd.bind(this);
        this.thayDoiSdtAdd = this.thayDoiSdtAdd.bind(this);
        this.thayDoiGioiTinhAdd = this.thayDoiGioiTinhAdd.bind(this);
        this.thayDoicccdAdd = this.thayDoicccdAdd.bind(this);
        this.thayDoiNgaySinhAdd = this.thayDoiNgaySinhAdd.bind(this);
        this.thayDoiTenUpdate = this.thayDoiTenUpdate.bind(this);
        this.thayDoiDiaChiUpdate = this.thayDoiDiaChiUpdate.bind(this);
        this.thayDoiSdtUpdate = this.thayDoiSdtUpdate.bind(this);
        this.thayDoiGioiTinhUpdate = this.thayDoiGioiTinhUpdate.bind(this);
        this.thayDoicccdUpdate = this.thayDoicccdUpdate.bind(this);
        this.thayDoiNgaySinhUpdate = this.thayDoiNgaySinhUpdate.bind(this);
    }

    componentDidMount() {
        this.loadThongTinData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadXuatXuData();
        }
    }

    thayDoiNgaySinhUpdate = (event) => {
        // Lấy giá trị ngày sinh từ sự kiện
        const ngaySinh = event.target.value;

        // Cập nhật ngày sinh trong state
        const updatedNguoiDung = { ...this.state.nguoiDungUpdate, ngaySinh };
        this.setState({ nguoiDungUpdate: updatedNguoiDung });
    };

    loadThongTinData(pageNumber) {
        thongtinservice.getThongTin(pageNumber).then(res => {
            this.setState({
                thongTin: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });

        const id = this.props.match.params.id;
        if (id) {
            thongtinservice.getThongTinById(id).then((res) => {
                this.setState({ thongTinUpdate: res.data });
            });
        }
    }

    loadPageData(pageNumber) {
        thongtinservice.getThongTin(pageNumber).then(res => {
            this.setState({
                thongTin: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
    }

    handlePageClick = data => {
        let selected = data.selected; // Trang được chọn từ react-paginate
        this.loadPageData(selected);
    };


    delete(id) {
        thongtinservice.deleteThongTin(id).then((res) => {
            this.setState({ thongTin: this.state.thongTin.filter(thongTin => thongTin.id != id) });
        });
    }
    add = (e) => {
        e.preventDefault();
        let thongTin = {
            ten: this.state.thongTinAdd.ten,
            diaChi: this.state.thongTinAdd.diaChi,
            sdt: this.state.thongTinAdd.sdt,
            cccd: this.state.thongTinAdd.cccd,
            gioiTinh: this.state.thongTinAdd.gioiTinh,
            ngaySinh: this.state.thongTinAdd.ngaySinh,

        }
        if (!this.state.thongTinAdd.ten.trim()) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, ten: "Tên không được bỏ trống!" } });
            return;
        }else if (!isNaN(this.state.thongTinAdd.ten.trim())) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, ten: "Tên phải là chữ" } });
            return;
        }else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, ten: "" } });
        }
/////
        if (!this.state.thongTinAdd.diaChi.trim()) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, diaChi: "Địa chỉ không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, diaChi: "" } });
        }
////
        if (!this.state.thongTinAdd.sdt.trim()) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, sdt: "Số điện thoại không được bỏ trống!" } });
            return;
        } else if (isNaN(this.state.thongTinAdd.sdt) || Number(this.state.thongTinAdd.sdt) < 0) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, sdt: "Số điện thoại phải là số dương!" } });
            return;
        } else if (!/^\d+$/.test(this.state.thongTinAdd.sdt)) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, sdt: "Số điện thoại phải là số!" } });
            return;
        } else if (this.state.thongTinAdd.sdt.length > 11) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, sdt: "Số điện thoại không được vượt quá 11dãy số!" } });
        } else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, sdt: "" } });
        }
        //
        if (!this.state.thongTinAdd.cccd.trim()) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, cccd: "cccd không được bỏ trống!" } });
            return;
        } else if (!/^\d{12}$/.test(this.state.thongTinAdd.cccd)) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, cccd: "cccd phải gồm 12 chữ số!" } });
            return;
        } else if (parseInt(this.state.thongTinAdd.cccd, 10) <= 0) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, cccd: "cccd phải là số lớn hơn 0!" } });
            return;
        } else if (/\./.test(this.state.thongTinAdd.cccd)) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, cccd: "cccd không được là số thập phân!" } });
            return;
        } else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, cccd: "" } });
        }
///
        if (!this.state.thongTinAdd.gioiTinh.trim()) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, gioiTinh: "Giới tính không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, gioiTinh: "" } });
        }
        //
        const currentDate = new Date();

        if (!this.state.thongTinAdd.ngaySinh.trim()) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, ngaySinh: "Ngày sinh không được bỏ trống!" } });
            return;
        } else {
            const inputDate = new Date(this.state.thongTinAdd.ngaySinh);
            if (inputDate > currentDate) {
                this.setState({ errorsAdd: { ...this.state.errorsAdd, ngaySinh: "Ngày sinh không được vượt quá ngày hiện tại!" } });
                return;
            } else {
                this.setState({ errorsAdd: { ...this.state.errorsAdd, ngaySinh: "" } });
            }
        }


              thongtinservice.addThongTin(thongTin).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let thongTinMoi = res.data;
                this.setState(prevState => ({
                    thongTin: [...prevState.thongTin, thongTinMoi]
                }));

                toast.success("Thêm thành công!"); // Thông báo thành công

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
        let thongTin = {
            ten: this.state.thongTinUpdate.ten,
            diaChi: this.state.thongTinUpdate.diaChi,
            sdt: this.state.thongTinUpdate.sdt,
            cccd: this.state.thongTinUpdate.cccd,
            gioiTinh: this.state.thongTinUpdate.gioiTinh,
            ngaySinh: this.state.thongTinUpdate.ngaySinh, }
        console.log('nsx' + JSON.stringify(thongTin));
        let id = this.state.thongTinUpdate.id;

        if (!this.state.thongTinUpdate.ten.trim()) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ten: "Tên không được bỏ trống!" } });
            return;
        }else if (!isNaN(this.state.thongTinUpdate.ten.trim())) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ten: "Tên phải là chữ" } });
            return;
        }else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ten: "" } });
        }
/////
        if (!this.state.thongTinUpdate.diaChi.trim()) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, diaChi: "Địa chỉ không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, diaChi: "" } });
        }
////
        if (!this.state.thongTinUpdate.sdt.trim()) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, sdt: "Số điện thoại không được bỏ trống!" } });
            return;
        } else if (isNaN(this.state.thongTinUpdate.sdt) || Number(this.state.thongTinAdd.sdt) < 0) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, sdt: "Số điện thoại phải là số dương!" } });
            return;
        } else if (!/^\d+$/.test(this.state.thongTinUpdate.sdt)) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, sdt: "Số điện thoại phải là số!" } });
            return;
        } else if (this.state.thongTinUpdate.sdt.length > 11) {
            this.setState({errorsUpdate: { ...this.state.errorsUpdate, sdt: "Số điện thoại không được vượt quá 11dãy số!" } });
        } else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, sdt: "" } });
        }
        //
        if (!this.state.thongTinUpdate.cccd.trim()) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, cccd: "cccd không được bỏ trống!" } });
            return;
        } else if (!/^\d{12}$/.test(this.state.thongTinUpdate.cccd)) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, cccd: "cccd phải gồm 12 chữ số!" } });
            return;
        } else if (parseInt(this.state.thongTinUpdate.cccd, 10) <= 0) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, cccd: "cccd phải là số lớn hơn 0!" } });
            return;
        } else if (/\./.test(this.state.thongTinUpdate.cccd)) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, cccd: "cccd không được là số thập phân!" } });
            return;
        } else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, cccd: "" } });
        }
///
        if (!this.state.thongTinUpdate.gioiTinh.trim()) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, gioiTinh: "Giới tính không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, gioiTinh: "" } });
        }
        //
        const currentDate = new Date();

        if (!this.state.thongTinUpdate.ngaySinh.trim()) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ngaySinh: "Ngày sinh không được bỏ trống!" } });
            return;
        } else {
            const inputDate = new Date(this.state.thongTinUpdate.ngaySinh);
            if (inputDate > currentDate) {
                this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ngaySinh: "Ngày sinh không được vượt quá ngày hiện tại!" } });
                return;
            } else {
                this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ngaySinh: "" } });
            }
        }
        thongtinservice.updateThongTin(thongTin, this.state.thongTinUpdate.id).then((res) => {
            let thongTinCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                thongTin: prevState.thongTin.map(tt =>
                    tt.id === thongTinCapNhat.id ? thongTinCapNhat : tt
                )
            }));
            toast.success("Sửa thành công!"); // Thông báo thành công
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
        });

    }
    detail(id) {
        window.location.href = (`/thongTindetail/${id}`);
    }

    thayDoiTenAdd = (event) => {
        this.setState(prevState => ({
            thongTinAdd: {
                ...prevState.thongTinAdd,
                ten: event.target.value
            }
        }));
    }
    thayDoiDiaChiAdd = (event) => {
        this.setState(prevState => ({
            thongTinAdd: {
                ...prevState.thongTinAdd,
                diaChi: event.target.value
            }
        }));
    }
    thayDoiSdtAdd = (event) => {
        this.setState(prevState => ({
            thongTinAdd: {
                ...prevState.thongTinAdd,
                sdt: event.target.value
            }
        }));
    }
    thayDoicccdAdd = (event) => {
        this.setState(prevState => ({
            thongTinAdd: {
                ...prevState.thongTinAdd,
                cccd: event.target.value
            }
        }));
    }
    thayDoiGioiTinhAdd = (event) => {
        this.setState(prevState => ({
            thongTinAdd: {
                ...prevState.thongTinAdd,
                gioiTinh: event.target.value
            }
        }));
    }
    thayDoiNgaySinhAdd = (event) => {
        this.setState(prevState => ({
            thongTinAdd: {
                ...prevState.thongTinAdd,
                ngaySinh: event.target.value
            }
        }));
    }


    thayDoiTenUpdate = (event) => {
        this.setState(prevState => ({
            thongTinUpdate: {
                ...prevState.thongTinUpdate,
                ten: event.target.value
            }
        }));
    }
    thayDoiDiaChiUpdate = (event) => {
        this.setState(prevState => ({
            thongTinUpdate: {
                ...prevState.thongTinUpdate,
                diaChi: event.target.value
            }
        }));
    }
    thayDoiSdtUpdate = (event) => {
        this.setState(prevState => ({
            thongTinUpdate: {
                ...prevState.thongTinUpdate,
                sdt: event.target.value
            }
        }));
    }
    thayDoicccdUpdate = (event) => {
        this.setState(prevState => ({
            thongTinUpdate: {
                ...prevState.thongTinUpdate,
                cccd: event.target.value
            }
        }));
    }
    thayDoiGioiTinhUpdate = (event) => {
        this.setState(prevState => ({
            thongTinUpdate: {
                ...prevState.thongTinUpdate,
                gioiTinh: event.target.value
            }
        }));
    }
    thayDoiNgaySinhUpdate = (event) => {
        this.setState(prevState => ({
            thongTinUpdate: {
                ...prevState.thongTinUpdate,
                ngaySinh: event.target.value
            }
        }));
    }




    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Thông tin người dùng</h1>
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
                                            <h5 className="card-title">Danh sách thông tin <span>| </span></h5>
                                            <table className="table datatable table-borderless ">
                                                <thead>
                                                <tr>
                                                    <th>Tên</th>
                                                    <th>Địa chỉ</th>
                                                    <th>SDT</th>
                                                    <th>Căn cước</th>
                                                    <th>Giới tính</th>
                                                    <th>Ngày sinh</th>
                                                    <th>Ngày Cập nhật</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.thongTin.map(
                                                        tt =>
                                                            <tr key={tt.id}>
                                                                <td>{tt.ten}</td>
                                                                <td>{tt.diaChi}</td>
                                                                <td>{tt.sdt}</td>
                                                                <td>{tt.cccd}</td>
                                                                <td>{tt.gioiTinh === 0 ? "Nam" : tt.gioiTinh === 1 ? "Nữ" : "Khác"}</td>
                                                                <td>{tt.ngaySinh}</td>
                                                                <td>{tt.ngayCapNhat}</td>


                                                                    {/*<button onClick={() => this.delete(xx.id)} className='btn btn-danger'>Xóa</button>*/}
                                                                    <button onClick={() => this.detail(tt.id)} className='btn btn-primary'>Chi tiết</button>

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
                                                        value={this.state.thongTinUpdate.ten}
                                                    />
                                                    {this.state.errorsUpdate.ten && <div className="text-danger">{this.state.errorsUpdate.ten}</div>}
                                                </div>
                                                <div>
                                                    Địa chỉ :
                                                    <input
                                                        className={`form-control ${this.state.errorsUpdate.diaChi ? 'is-invalid' : ''}`}
                                                        name="diaChi"
                                                        onChange={this.thayDoiDiaChiUpdate}
                                                        value={this.state.thongTinUpdate.diaChi}
                                                    />
                                                    {this.state.errorsUpdate.diaChi && <div className="text-danger">{this.state.errorsUpdate.diaChi}</div>}
                                                </div>
                                                <div>
                                                    SDT :
                                                    <input
                                                        className={`form-control ${this.state.errorsUpdate.sdt ? 'is-invalid' : ''}`}
                                                        name="sdt"
                                                        onChange={this.thayDoiSdtUpdate}
                                                        value={this.state.thongTinUpdate.sdt}
                                                    />
                                                    {this.state.errorsUpdate.sdt && <div className="text-danger">{this.state.errorsUpdate.sdt}</div>}
                                                </div>
                                                <div>
                                                    Giới tính :
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="gioiTinh"
                                                            value="0"
                                                            checked={this.state.thongTinUpdate.gioiTinh === 0}
                                                            onChange={this.thayDoiGioiTinhUpdate}
                                                        /> Nam
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="gioiTinh"
                                                            value="1"
                                                            checked={this.state.thongTinUpdate.gioiTinh === 1}
                                                            onChange={this.thayDoiGioiTinhUpdate}
                                                        /> Nữ
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="gioiTinh"
                                                            value="2"
                                                            checked={this.state.thongTinUpdate.gioiTinh === 2}
                                                            onChange={this.thayDoiGioiTinhUpdate}
                                                        /> Khác
                                                    </label>

                                                    {this.state.errorsUpdate.gioiTinh && (<div className="text-danger">{this.state.errorsUpdate.gioiTinh}</div>)}
                                                </div>
                                                <div>
                                                    Ngày sinh :
                                                    <input
                                                        className={`form-control ${this.state.errorsUpdate.ngaySinh ? 'is-invalid' : ''}`}
                                                        name="ngaySinh" type={"date"}
                                                        onChange={this.thayDoiNgaySinhUpdate}
                                                        value={this.state.thongTinUpdate.ngaySinh}
                                                    />
                                                    {this.state.errorsUpdate.ngaySinh && <div className="text-danger">{this.state.errorsUpdate.ngaySinh}</div>}
                                                </div>
                                                <div>
                                                    cccd:
                                                    <div>
                                                     <span className={`form-control ${this.state.errorsUpdate.cccd ? 'is-invalid' : ''}`}>
                                                         {this.state.thongTinUpdate.cccd}
                                                         </span>
                                                    </div>

                                                </div>


                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    cccd :
                                                    <input
                                                        className={`form-control ${this.state.errorsAdd.cccd ? 'is-invalid' : ''}`}
                                                        name="cccd"
                                                        onChange={this.thayDoicccdAdd}
                                                        value={this.state.thongTinAdd.cccd}
                                                    />
                                                    {this.state.errorsAdd.cccd && <div className="text-danger">{this.state.errorsAdd.cccd}</div>}
                                                </div>
                                                <div>
                                                    Tên :
                                                    <input
                                                        className={`form-control ${this.state.errorsAdd.ten ? 'is-invalid' : ''}`}
                                                        name="ten"
                                                        onChange={this.thayDoiTenAdd}
                                                        value={this.state.thongTinAdd.ten}
                                                    />
                                                    {this.state.errorsAdd.ten && <div className="text-danger">{this.state.errorsAdd.ten}</div>}
                                                </div>
                                                <div>
                                                    Địa chỉ :
                                                    <input
                                                        className={`form-control ${this.state.errorsAdd.diaChi ? 'is-invalid' : ''}`}
                                                        name="diaChi"
                                                        onChange={this.thayDoiDiaChiAdd}
                                                        value={this.state.thongTinAdd.diaChi}
                                                    />
                                                    {this.state.errorsAdd.diaChi && <div className="text-danger">{this.state.errorsAdd.diaChi}</div>}
                                                </div>
                                                <div>
                                                    SDT :
                                                    <input
                                                        className={`form-control ${this.state.errorsAdd.sdt ? 'is-invalid' : ''}`}
                                                        name="sdt"
                                                        onChange={this.thayDoiSdtAdd}
                                                        value={this.state.thongTinAdd.sdt}
                                                    />
                                                    {this.state.errorsAdd.sdt && <div className="text-danger">{this.state.errorsAdd.sdt}</div>}
                                                </div>
                                                <div>
                                                    Giới tính :
                                                    <label>
                                                        <input type="radio" name="gioiTinh"  checked={this.state.thongTinAdd.gioiTinh === "0"} onChange={this.thayDoiGioiTinhAdd}
                                                        /> Nam
                                                    </label>
                                                    <label>
                                                        <input type="radio" name="gioiTinh"  checked={this.state.thongTinAdd.gioiTinh === "1"} onChange={this.thayDoiGioiTinhAdd}
                                                        /> Nữ
                                                    </label>
                                                    <label>
                                                        <input type="radio" name="gioiTinh" checked={this.state.thongTinAdd.gioiTinh === "2"} onChange={this.thayDoiGioiTinhAdd}
                                                        /> Khác
                                                    </label>
                                                    {this.state.errorsAdd.gioiTinh && (<div className="text-danger">{this.state.errorsAdd.gioiTinh}</div>)}
                                                </div>
                                                <div>
                                                    Ngày sinh :
                                                    <input
                                                        className={`form-control ${this.state.errorsAdd.ngaySinh ? 'is-invalid' : ''}`}
                                                        name="ngaySinh" type={"date"}
                                                        onChange={this.thayDoiNgaySinhAdd}
                                                        value={this.state.thongTinAdd.ngaySinh}
                                                    />
                                                    {this.state.errorsAdd.ngaySinh && <div className="text-danger">{this.state.errorsAdd.ngaySinh}</div>}
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
export default ThongTinComponent