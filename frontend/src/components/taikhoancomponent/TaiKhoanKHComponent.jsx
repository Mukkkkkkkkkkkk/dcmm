import React, {Component} from 'react';
import KhuyenMaiService from "../../services/khuyenmaiservice/KhuyenMaiService";
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";
import {toast} from "react-toastify";
import thongtinservice from "../../services/thongtinservice/thongtinservice";


class TaiKhoanKHComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nhanVienQuyen3: [],
            thongTinNguoiDung: [],
            pageCount: 0,
            taiKhoanAdd: {
                username: '',
                email: '',
                password: '',
                anh: ''
            },
            taiKhoanUpdate: {
                username: '',
                email: '',
                password: '',
                anh: ''
            },
            nguoiDungAdd: {
                diaChi: '',
                sdt: '',
                ten: '',
                gioiTinh: '',
                ngaySinh: '',
            },
            nguoiDungUpdate: {
                diaChi: '',
                sdt: '',
                ten: '',
                cccd: '',
                gioiTinh: '',
                ngaySinh: '',
            },
            errorAdd: {
                diaChi: '',
                sdt: '',
                ten: '',
                gioiTinh: '',
                ngaySinh: '',
                username: '',
                email: '',
                password: '',
                anh: ''
            },
            errorUpdate: {
                diaChi: '',
                sdt: '',
                ten: '',
                gioiTinh: '',
                ngaySinh: '',
                username: '',
                email: '',
                password: '',
                anh: ''
            }
        }
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiTenAdd = this.thayDoiTenAdd.bind(this);
        this.thayDoiDiaChiAdd = this.thayDoiDiaChiAdd.bind(this);
        this.thayDoiSdtAdd = this.thayDoiSdtAdd.bind(this);
        this.thayDoiGioiTinhAdd = this.thayDoiGioiTinhAdd.bind(this);
        this.thayDoiPassAdd = this.thayDoiPassAdd.bind(this);
        this.thayDoiNGaySinhAdd = this.thayDoiNGaySinhAdd.bind(this);
        this.thayDoiUsernameAdd = this.thayDoiUsernameAdd.bind(this);
        this.thayDoiAnhAdd = this.thayDoiAnhAdd.bind(this);
        this.thayDoiEmailAdd = this.thayDoiEmailAdd.bind(this);
    }

    componentDidMount() {
        taikhoanservice.getKhachHang().then((res) => {
            this.setState({nhanVienQuyen3: res.data});
        });
        // const id = this.props.match.params.id;
        // if (id) {
        //     taikhoanservice.getTaiKhoanById()(this.state.taiKhoanUpdate.id).then((res) => {
        //         this.setState({taiKhoanUpdate: res.data});
        //     })
        // }


    }

    delete(id) {
        KhuyenMaiService.deleteKhuyenMai(id).then((res) => {
        });
        window.location.href = (`/index`);
    }

    add = (e) => {
        e.preventDefault();
        const { taiKhoanAdd, nguoiDungAdd } = this.state;
        const requestData = {
            taiKhoan: taiKhoanAdd,
            thongTinNguoiDung: nguoiDungAdd,
            //     username: this.state.taiKhoanAdd.username,
            //     email: this.state.taiKhoanAdd.email,
            //     password: this.state.taiKhoanAdd.password,
            //     ten: this.state.nguoiDungAdd.ten,
            //     diaChi: this.state.nguoiDungAdd.diaChi,
            // sdt: this.state.nguoiDungAdd.sdt,
            // CCCD: this.state.nguoiDungAdd.CCCD,
            // gioiTinh: this.state.nguoiDungAdd.gioiTinh,
            // ngaySinh: this.state.nguoiDungAdd.ngaySinh,

        };
//
//         // Kiểm tra xem username đã tồn tại trong danh sách tài khoản chưa
//         const existingUser = this.state.taiKhoan.find(user => user.username === requestData.taiKhoan.username);
//         if (existingUser) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, username: "Username đã tồn tại!" } });
//         } else if (!requestData.taiKhoan || !requestData.taiKhoan.username) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, username: "Username không được bỏ trống!" } });
//         } else {
//             // Nếu không có lỗi, xóa lỗi về username
//             this.setState({ errorAdd: { ...this.state.errorAdd, username: "" } });
//         }
// ////email
//         const existingEmail = this.state.taiKhoan.find(user => user.email === requestData.taiKhoan.email);
//         if (existingEmail) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, email: "Email đã tồn tại!" } });
//             return;
//         } else {
//             // Kiểm tra xem email có giá trị hay không
//             if (!requestData.taiKhoan.email) {
//                 this.setState({errorAdd: {...this.state.errorAdd, email: "Email không được bỏ trống!"}});
//                 return;
//             } else {
//                 // Kiểm tra định dạng email bằng biểu thức chính quy
//                 if (!isValidEmail(requestData.taiKhoan.email)) {
//                     this.setState({errorAdd: {...this.state.errorAdd, email: "Email không hợp lệ!"}});
//                     return;
//                 } else {
//                     // Nếu email hợp lệ, xóa thông báo lỗi
//                     this.setState({errorAdd: {...this.state.errorAdd, email: ""}});
//                 }
//
//                 function isValidEmail(email) {
//                     const emailPattern = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
//                     return emailPattern.test(email);
//                 }
//             }
//         }
//         // Kiểm tra mật khẩu
//         if (!requestData.taiKhoan || !requestData.taiKhoan.password) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, password: "Password không được bỏ trống!" } });
//             return;
//         } else if (requestData.taiKhoan.password.includes(" ")) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, password: "Password không được chứa khoảng trắng!" } });
//             return;
//         } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(requestData.taiKhoan.password)) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, password: "Password phải chứa ít nhất một ký tự đặc biệt!" }});
//             return;
//         } else {
//             this.setState({ errorAdd: { ...this.state.errorAdd, password: "" } });
//         }
//         ///anh
//         if (!this.state.taiKhoanAdd.anh) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, anh: "Ảnh không được bỏ trống!" } });
//             return;
//         }
//         else {
//             this.setState({ errorAdd: { ...this.state.errorAdd, anh: "" } });
//         }
//
//         // Kiểm tra tên
//         if (!requestData.thongTinNguoiDung.ten.trim()) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, ten: "Họ và tên không được bỏ trống!" } });
//             return;
//         } else if (!/^[A-Za-z\s]+$/.test(requestData.thongTinNguoiDung.ten.trim())) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, ten: "Họ và tên phải là chuỗi ký tự!" }});
//             return;
//         } else {
//             this.setState({ errorAdd: { ...this.state.errorAdd, ten: "" } });
//         }
//         // Kiểm tra địa chỉ
//         if (!requestData.thongTinNguoiDung.diaChi.trim()) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, diaChi: "Địa chỉ không được bỏ trống!" } });
//             return;
//         } else {
//             this.setState({ errorAdd: { ...this.state.errorAdd, diaChi: "" } });
//         }
//            ///sdt
//         if (!this.state.thongTinNguoiDung.sdt.trim()) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, sdt: "Số điện thoại không được bỏ trống!" }});
//             return;
//         } else if (isNaN(this.state.thongTinNguoiDung.sdt) || Number(this.state.thongTinNguoiDung.sdt) < 0) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, sdt: "Số điện thoại phải là số dương!" }});
//             return;
//         } else if (!/^\d+$/.test(this.state.thongTinNguoiDung.sdt)) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, sdt: "Số điện thoại phải là số!" }});
//             return;
//         } else if (this.state.thongTinNguoiDung.sdt.length > 11) {
//             this.setState({errorAdd: { ...this.state.errorAdd, sdt: "Số điện thoại không được vượt quá 11 dãy số!" }});
//         } else {
//             this.setState({errorAdd: { ...this.state.errorAdd, sdt: "" }});
//         }
//         //cccd
//         if (!this.state.thongTinNguoiDung.cccd.trim()) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "CCCD không được bỏ trống!" }});
//             return;
//         } else if (!/^\d{12}$/.test(this.state.thongTinNguoiDung.cccd)) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "CCCD phải gồm 12 chữ số!" }});
//             return;
//         } else if (parseInt(this.state.thongTinNguoiDung.cccd, 10) <= 0) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "CCCD phải là số lớn hơn 0!" }});
//             return;
//         } else if (/\./.test(this.state.thongTinNguoiDung.cccd)) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "CCCD không được là số thập phân!" }});
//             return;
//         } else {
//             this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "" }});
//         }
//            ///gioiTinh
//         if (!this.state.thongTinAdd.gioiTinh.trim()) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, gioiTinh: "Giới tính không được bỏ trống!" }});
//             return;
//         } else if (this.state.thongTinAdd.gioiTinh !== "Nam" && this.state.thongTinAdd.gioiTinh !== "Nữ") {
//             this.setState({ errorAdd: { ...this.state.errorAdd, gioiTinh: "Giới tính không hợp lệ!" }});
//             return;
//         } else {
//             this.setState({ errorAdd: { ...this.state.errorAdd, gioiTinh: "" }});
//         }
//         //ngáyinh
//         const currentDate = new Date();
//
//         if (!this.state.thongTinAdd.ngaySinh.trim()) {
//             this.setState({ errorAdd: { ...this.state.errorAdd, ngaySinh: "Ngày sinh không được bỏ trống!" } });
//             return;
//         } else {
//             const inputDate = new Date(this.state.thongTinAdd.ngaySinh);
//             if (inputDate > currentDate) {
//                 this.setState({ errorAdd: { ...this.state.errorAdd, ngaySinh: "Ngày sinh không được vượt quá ngày hiện tại!" } });
//                 return;
//             } else {
//                 this.setState({ errorAdd: { ...this.state.errorAdd, ngaySinh: "" } });
//             }
//         }
        // Gọi API để thêm tài khoản
        taikhoanservice.addKhachHang(requestData)
            .then((res) => {
                if (res.status=== 200) {
                    // Xử lý khi thêm thành công
                    let taiKhoanMoi = res.data.taiKhoan; // Chỉ lấy tài khoản từ kết quả API

                    // Thêm taiKhoanMoi vào state (nếu đang sử dụng React)
                    this.setState((prevState) => ({
                        nhanVienQuyen3: [...prevState.nhanVienQuyen3, taiKhoanMoi],
                    }));

                    let nguoiDungMoi = res.data.thongTinNguoiDung; // Chỉ lấy tài khoản từ kết quả API

                    // Thêm taiKhoanMoi vào state (nếu đang sử dụng React)
                    this.setState((prevState) => ({
                        thongTinNguoiDung: [...prevState.thongTinNguoiDung, nguoiDungMoi],
                    }));

                    setTimeout(() => {
                        window.location.href = (`/khachhang`);
                    }, 2000);
                    toast.success("Thêm thành công!");

                    // Chuyển hướng (sử dụng props.history nếu có)
                } else {
                    // Xử lý khi có lỗi trả về từ API
                    const errorMessage = res.data.message || "Có lỗi xảy ra khi thêm danh mục.";
                    toast.error("Lỗi: " + errorMessage); // Hiển thị lỗi bằng Toast hoặc cách khác
                    console.log(res.data.error)
                }
            })
            .catch((error) => {
                // Xử lý lỗi khi gửi yêu cầu API
                if (error.message === "Network Error") {
                    toast.error("Lỗi kết nối mạng. Vui lòng kiểm tra kết nối của bạn.");
                } else {
                    toast.error("Lỗi khi gửi yêu cầu API: " + error);
                }
            });
    }


    detail(id) {
        window.location.href = (`/khachhangdetail/${id}`);
    }

    thayDoiTenAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    ten: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, ten: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiDiaChiAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    diaChi: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, diaChi: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiSdtAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    sdt: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, sdt: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiGioiTinhAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    gioiTinh: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, gioiTinh: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiNGaySinhAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    ngaySinh: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, ngaySinh: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiUsernameAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    username: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, username: ""};
        this.setState({errorAdd: errorAdd});
    }

    thayDoiCCCDAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    cccd: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, cccd: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiEmailAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    email: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, email: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiPassAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    password: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, password: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiAnhAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    anh: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, anh: ""};
        this.setState({errorAdd: errorAdd});
    }
    // thayDoiMaUpdate=(event)=>{
    //     this.setState(
    //         prevState=>({
    //             khuyenMaiUpdate:{
    //                 ...prevState.khuyenMaiUpdate,
    //                 ma:event.target.value
    //             }
    //         })
    //     );
    //     let errorUpdate = {...this.state.errorUpdate,ma:""};
    //     this.setState({errorUpdate:errorUpdate});
    // }
    // thayDoiTenUpdate=(event)=>{
    //     this.setState(
    //         prevState=>({
    //             khuyenMaiUpdate:{
    //                 ...prevState.khuyenMaiUpdate,
    //                 ten:event.target.value
    //             }
    //         })
    //     );
    //     let errorUpdate = {...this.state.errorUpdate,ten:""};
    //     this.setState({errorUpdate:errorUpdate});
    // }
    // thayDoiMoTaUpdate=(event)=>{
    //     this.setState(
    //         prevState=>({
    //             khuyenMaiUpdate:{
    //                 ...prevState.khuyenMaiUpdate,
    //                 moTa:event.target.value
    //             }
    //         })
    //     );
    //     let errorUpdate = {...this.state.errorUpdate,moTa:""};
    //     this.setState({errorUpdate:errorUpdate});
    // }
    // thayDoiBatDauUpdate=(event)=>{
    //     this.setState(
    //         prevState=>({
    //             khuyenMaiUpdate:{
    //                 ...prevState.khuyenMaiUpdate,
    //                 batDau:event.target.value
    //             }
    //         })
    //     );
    //     let errorUpdate = {...this.state.errorUpdate,batDau:""};
    //     this.setState({errorUpdate:errorUpdate});
    // }
    // thayDoiKetThucUpdate=(event)=>{
    //     this.setState(
    //         prevState=>({
    //             khuyenMaiUpdate:{
    //                 ...prevState.khuyenMaiUpdate,
    //                 ketThuc:event.target.value
    //             }
    //         })
    //     );
    //     let errorUpdate = {...this.state.errorUpdate,ketThuc:""};
    //     this.setState({errorUpdate:errorUpdate});
    // }
    // thayDoiGiamGiaUpdate=(event)=>{
    //     this.setState(
    //         prevState=>({
    //             khuyenMaiUpdate:{
    //                 ...prevState.khuyenMaiUpdate,
    //                 giamGia:event.target.value
    //             }
    //         })
    //     );
    //     let errorUpdate = {...this.state.errorUpdate,giamGia:""};
    //     this.setState({errorUpdate:errorUpdate});
    // }
    //
    // thayDoiKieuKhuyenMaiUpdate=(event)=>{
    //     this.setState(
    //         prevState=>({
    //             khuyenMaiUpdate:{
    //                 ...prevState.khuyenMaiUpdate,
    //                 kieuKhuyenMai:event.target.value
    //             }
    //         })
    //     );
    // }
    // thayDoiDieuKienUpdate=(event)=>{
    //     this.setState(
    //         prevState=>({
    //             khuyenMaiUpdate:{
    //                 ...prevState.khuyenMaiUpdate,
    //                 dieuKien:event.target.value
    //             }
    //         })
    //     );
    // }
    // thayDoiSoLuongUpdate=(event)=>{
    //     this.setState(
    //         prevState=>({
    //             khuyenMaiUpdate:{
    //                 ...prevState.khuyenMaiUpdate,
    //                 soLuong:event.target.value
    //             }
    //         })
    //     );
    // }
    // thayDoiTrangThaiUpdate=(event)=>{
    //     this.setState(
    //         prevState=>({
    //             khuyenMaiUpdate:{
    //                 ...prevState.khuyenMaiUpdate,
    //                 trangThai:event.target.value
    //             }
    //         })
    //     );
    // }
    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Khách hàng</h1>
                    {/*<nav>*/}
                    {/*    <ol className="breadcrumb">*/}
                    {/*        <li className="breadcrumb-item"><a href="index.html">Home</a></li>*/}
                    {/*        <li className="breadcrumb-item active">Overview</li>*/}
                    {/*        <li className="breadcrumb-item active">Tài khoản</li>*/}
                    {/*    </ol>*/}
                    {/*</nav>*/}
                </div>


                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-10">
                            <div className="card">

                                <div className="card-body">
                                    {/*<h5 className="card-title">ADD<span>| xx</span></h5>*/}
                                    <form>
                                        <div>
                                            Ảnh :
                                            <input
                                                className={`form-control ${this.state.errorAdd.anh ? 'is-invalid' : ''}`}
                                                type={"file"} value={this.state.taiKhoanAdd.anh}
                                                onChange={this.thayDoiAnhAdd}/>
                                            {this.state.errorAdd.anh &&
                                            <div className="text-danger">{this.state.errorAdd.anh}</div>}
                                        </div>
                                        <div>
                                            Họ và tên :
                                            <input
                                                className={`form-control ${this.state.errorAdd.ten ? 'is-invalid' : ''}`}
                                                name="ten"
                                                value={this.state.nguoiDungAdd.ten} onChange={this.thayDoiTenAdd}/>
                                            {this.state.errorAdd.ten &&
                                            <div className="text-danger">{this.state.errorAdd.ten}</div>}
                                        </div>
                                        <div>
                                            Địa chỉ:
                                            <input
                                                className={`form-control ${this.state.errorAdd.diaChi ? 'is-invalid' : ''}`}
                                                name="diaChi"
                                                onChange={this.thayDoiDiaChiAdd}
                                                value={this.state.nguoiDungAdd.diaChi} // Make sure the value is set
                                            />
                                            {this.state.errorAdd.diaChi &&
                                            <div className="text-danger">{this.state.errorAdd.diaChi}</div>}
                                        </div>
                                        <div>
                                            SDT :
                                            <input
                                                className={`form-control ${this.state.errorAdd.sdt ? 'is-invalid' : ''}`}
                                                name="sdt"
                                                onChange={this.thayDoiSdtAdd}
                                                value={this.state.nguoiDungAdd.sdt}/>

                                            {this.state.errorAdd.sdt &&
                                            <div className="text-danger">{this.state.errorAdd.sdt}</div>}
                                        </div>
                                        <div>
                                            Giới tính :
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="gioiTinh"
                                                    value="0"
                                                    // checked={this.state.nguoiDungAdd.gioiTinh === 0}
                                                    onChange={this.thayDoiGioiTinhAdd}
                                                /> Nam
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="gioiTinh"
                                                    value="1"
                                                    // checked={this.state.nguoiDungAdd.gioiTinh === 1}
                                                    onChange={this.thayDoiGioiTinhAdd}
                                                /> Nữ
                                            </label>
                                            {this.state.errorAdd.gioiTinh && (
                                                <div className="text-danger">{this.state.errorAdd.gioiTinh}</div>)}
                                        </div>
                                        <div>
                                            Ngày Sinh :
                                            <input
                                                className={`form-control ${this.state.errorAdd.ngaySinh ? 'is-invalid' : ''}`}
                                                value={this.state.nguoiDungAdd.ngaySinh} name="ngaySinh" type="date"
                                                onChange={this.thayDoiNGaySinhAdd}/>
                                            {this.state.errorAdd.ngaySinh &&
                                            <div className="text-danger">{this.state.errorAdd.ngaySinh}</div>}
                                        </div>
                                        <div>
                                            Email :
                                            <input
                                                className={`form-control ${this.state.errorAdd.email ? 'is-invalid' : ''}`}
                                                name="email" value={this.state.taiKhoanAdd.email}
                                                onChange={this.thayDoiEmailAdd}/>
                                            {this.state.errorAdd.email &&
                                            <div className="text-danger">{this.state.errorAdd.email}</div>}
                                        </div>
                                        <div>
                                            UserName :
                                            <input
                                                className={`form-control ${this.state.errorAdd.username ? 'is-invalid' : ''}`}
                                                name="username" value={this.state.taiKhoanAdd.username}
                                                onChange={this.thayDoiUsernameAdd}/>
                                            {this.state.errorAdd.username &&
                                            <div className="text-danger">{this.state.errorAdd.username}</div>}
                                        </div>
                                        <div>
                                            PassWord :
                                            <input
                                                className={`form-control ${this.state.errorAdd.password ? 'is-invalid' : ''}`}
                                                name="password" value={this.state.taiKhoanAdd.password}
                                                onChange={this.thayDoiPassAdd}/>
                                            {this.state.errorAdd.password &&
                                            <div className="text-danger">{this.state.errorAdd.password}</div>}
                                        </div>
                                        <input type="submit" className="btn btn-primary" value="Add"
                                               style={{marginTop: '10px'}} onClick={this.add}/>
                                    </form>
                                </div>

                            </div>
                        </div>


                    </div>

                </section>
            </div>
        )
    }
}

export default TaiKhoanKHComponent