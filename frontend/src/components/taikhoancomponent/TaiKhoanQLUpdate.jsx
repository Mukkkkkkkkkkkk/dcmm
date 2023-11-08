import React, {Component} from 'react';
import KhuyenMaiService from "../../services/khuyenmaiservice/KhuyenMaiService";
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";
import {toast} from "react-toastify";
import thongtinservice from "../../services/thongtinservice/thongtinservice";
import SanPhamService from "../../services/sanphamservice/SanPhamService";


class TaiKhoanQLUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nhanVienQuyen2: [],
            thongTinNguoiDung: [],
            pageCount: 0,
            taiKhoanUpdate: {
                id: this.props.match.params.id,
                username: null,
                email: '',
                password: '',
                anh: '',
            },
            nguoiDungUpdate: {
                id: this.props.match.params.id,
                diaChi: '',
                sdt: '',
                ten: '',
                cccd: null,
                gioiTinh: '',
                ngaySinh: '',
            },
            errorUpdate: {
                diaChi: '',
                sdt: '',
                ten: '',
                cccd: '',
                gioiTinh: '',
                ngaySinh: '',
                username: '',
                email: '',
                password: '',
                anh: ''
            }

        }

        this.update = this.update.bind(this);
        this.thayDoiTenUpdate = this.thayDoiTenUpdate.bind(this);
        this.thayDoiDiaChiUpdate = this.thayDoiDiaChiUpdate.bind(this);
        this.thayDoiSdtUpdate = this.thayDoiSdtUpdate.bind(this);
        this.thayDoiGioiTinhUpdate = this.thayDoiGioiTinhUpdate.bind(this);
        this.thayDoiPassUpdate = this.thayDoiPassUpdate.bind(this);
        this.thayDoiNGaySinhUpdate = this.thayDoiNGaySinhUpdate.bind(this);
        this.thayDoiUsernameUpdate = this.thayDoiUsernameUpdate.bind(this);
        this.thayDoiAnhUpdate = this.thayDoiAnhUpdate.bind(this);
        this.thayDoiCCCDUpdate = this.thayDoiCCCDUpdate.bind(this);
        this.thayDoiEmailUpdate = this.thayDoiEmailUpdate.bind(this);
    }

    componentDidMount() {

        const id = this.props.match.params.id;
        taikhoanservice.getTaiKhoanById(id)
            .then((response) => {
                const taiKhoanData = response.data;
                console.log("User Account Data:", taiKhoanData);
                this.setState({taiKhoanUpdate: taiKhoanData});

                // Sau khi lấy thông tin tài khoản, bạn có thể tiếp tục lấy thông tin người dùng.
                taikhoanservice.getThongTinByTaiKhoan(taiKhoanData)
                    .then((thongTinResponse) => {
                        const thongTinData = thongTinResponse.data;
                        console.log("User Information Data:", thongTinData);
                        this.setState({nguoiDungUpdate: thongTinData});
                    })
                    .catch((error) => {
                        console.error("Error fetching user information:", error);
                    });
            })
            .catch((error) => {
                console.error("Error fetching user account:", error);
            });
    }


    update = (e) => {
        e.preventDefault();
        const {taiKhoanUpdate, nguoiDungUpdate} = this.state;
        const requestData = {
            taiKhoan: taiKhoanUpdate,
            thongTinNguoiDung: nguoiDungUpdate,
        };
        // Log the request data for debugging purposes
        console.log('Request Data: ' + JSON.stringify(requestData));
        taikhoanservice.updateQuanLy(requestData, this.state.taiKhoanUpdate.id)
            .then((response) => {
                const {taiKhoan, thongTinNguoiDung} = response.data;
                this.setState({
                    taiKhoanUpdate: taiKhoan,
                    nguoiDungUpdate: thongTinNguoiDung,
                });
                setTimeout(() => {
                    window.location.href = (`/quanly`);
                }, 2000);
                toast.success("Sửa thành công!");
            })
            .catch((error) => {
                console.error("Update request error:", error);
                toast.error("Lỗi khi cập nhật");
            });
    };


    thayDoiTenUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    ten: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, ten: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    thayDoiDiaChiUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    diaChi: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, diaChi: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    thayDoiSdtUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    sdt: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, sdt: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    thayDoiGioiTinhUpdate = (selectedGender) => {
        const updatedNguoiDung = {...this.state.nguoiDungUpdate, gioiTinh: selectedGender};
        this.setState({nguoiDungUpdate: updatedNguoiDung});
        let errorUpdate = {...this.state.errorUpdate, gioiTinh: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    thayDoiNGaySinhUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    ngaySinh: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, ngaySinh: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    thayDoiUsernameUpdate = (event) => {
        this.setState(
            prevState => ({
                taiKhoanUpdate: {
                    ...prevState.taiKhoanUpdate,
                    username: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, username: ""};
        this.setState({errorUpdate: errorUpdate});
    }

    thayDoiCCCDUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    cccd: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, cccd: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    thayDoiEmailUpdate = (event) => {
        this.setState(
            prevState => ({
                taiKhoanUpdate: {
                    ...prevState.taiKhoanUpdate,
                    email: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, email: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    thayDoiPassUpdate = (event) => {
        this.setState(
            prevState => ({
                taiKhoanUpdate: {
                    ...prevState.taiKhoanUpdate,
                    password: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, password: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    thayDoiAnhUpdate = (event) => {
        this.setState(
            prevState => ({
                taiKhoanUpdate: {
                    ...prevState.taiKhoanUpdate,
                    anh: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, anh: ""};
        this.setState({errorUpdate: errorUpdate});
    }

    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Cập nhật tài khoản quản lý</h1>
                    <nav>
                        {/*<ol className="breadcrumb">*/}
                        {/*    <li className="breadcrumb-item"><a href="index.html">Home</a></li>*/}
                        {/*    <li className="breadcrumb-item active">Overview</li>*/}
                        {/*    <li className="breadcrumb-item active">Quản lý</li>*/}
                        {/*</ol>*/}
                    </nav>
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
                                                className={`form-control ${this.state.errorUpdate.anh ? 'is-invalid' : ''}`}
                                                type={"file"}
                                                onChange={this.thayDoiAnhUpdate}/>
                                            {this.state.errorUpdate.anh &&
                                            <div className="text-danger">{this.state.errorUpdate.anh}</div>}
                                        </div>
                                        <div>
                                            Họ và tên:
                                            <input
                                                className={`form-control ${this.state.errorUpdate.ten ? 'is-invalid' : ''}`}
                                                name="ten" style={{}}
                                                value={this.state.nguoiDungUpdate && this.state.nguoiDungUpdate.ten ? this.state.nguoiDungUpdate.ten : ''}
                                                onChange={this.thayDoiTenUpdate}
                                            />
                                            {this.state.errorUpdate.ten &&
                                            <div className="text-danger">{this.state.errorUpdate.ten}</div>}
                                        </div>

                                        <div>
                                            Địa chỉ:
                                            <input
                                                className={`form-control ${this.state.errorUpdate.diaChi ? 'is-invalid' : ''}`}
                                                name="diaChi" style={{}}
                                                onChange={this.thayDoiDiaChiUpdate}
                                                value={this.state.nguoiDungUpdate && this.state.nguoiDungUpdate.diaChi ? this.state.nguoiDungUpdate.diaChi : ''} // Make sure the value is set
                                            />
                                            {this.state.errorUpdate.diaChi &&
                                            <div className="text-danger">{this.state.errorUpdate.diaChi}</div>}
                                        </div>
                                        <div>
                                            SDT :
                                            <input
                                                className={`form-control ${this.state.errorUpdate.sdt ? 'is-invalid' : ''}`}
                                                name="sdt" style={{}}
                                                onChange={this.thayDoiSdtUpdate}
                                                value={this.state.nguoiDungUpdate && this.state.nguoiDungUpdate.sdt ? this.state.nguoiDungUpdate.sdt : ''}/>

                                            {this.state.errorUpdate.sdt &&
                                            <div className="text-danger">{this.state.errorUpdate.sdt}</div>}
                                        </div>
                                        <div>
                                            CCCD :
                                            <input
                                                className={`form-control ${this.state.errorUpdate.cccd ? 'is-invalid' : ''}`}
                                                style={{}}
                                                name="cccd" value={this.state.nguoiDungUpdate && this.state.nguoiDungUpdate.cccd ? this.state.nguoiDungUpdate.cccd : ''}
                                                disabled />
                                        </div>
                                        <div>
                                            Giới tính :
                                            {this.state.nguoiDungUpdate && (
                                                <div>
                                                    <label className="radio-label">
                                                        <input
                                                            type="radio"
                                                            name="gioiTinh"
                                                            value="0"
                                                            checked={this.state.nguoiDungUpdate.gioiTinh === 0}
                                                            onChange={() => this.thayDoiGioiTinhUpdate(0)}
                                                        />
                                                        <span className="radio-custom"></span>
                                                        Nam
                                                    </label>
                                                    <label className="radio-label">
                                                        <input
                                                            type="radio"
                                                            name="gioiTinh"
                                                            value="1"
                                                            checked={this.state.nguoiDungUpdate.gioiTinh === 1}
                                                            onChange={() => this.thayDoiGioiTinhUpdate(1)}
                                                        />
                                                        <span className="radio-custom"></span>
                                                        Nữ
                                                    </label>
                                                </div>
                                            )}
                                            {this.state.errorUpdate.gioiTinh && (
                                                <div className="text-danger">{this.state.errorUpdate.gioiTinh}</div>
                                            )}
                                        </div>

                                        <div>
                                            Ngày Sinh :
                                            <input
                                                className={`form-control ${this.state.errorUpdate.ngaySinh ? 'is-invalid' : ''}`}
                                                style={{}}
                                                value={this.state.nguoiDungUpdate && this.state.nguoiDungUpdate.ngaySinh ? this.state.nguoiDungUpdate.ngaySinh : ''} name="ngaySinh" type="date"
                                                onChange={this.thayDoiNGaySinhUpdate}/>
                                            {this.state.errorUpdate.ngaySinh &&
                                            <div className="text-danger">{this.state.errorUpdate.ngaySinh}</div>}
                                        </div>
                                        <div>
                                            Email :
                                            <input
                                                className={`form-control ${this.state.errorUpdate.email ? 'is-invalid' : ''}`}
                                                style={{}}
                                                name="email" value={this.state.taiKhoanUpdate && this.state.taiKhoanUpdate.email ? this.state.taiKhoanUpdate.email : ''}
                                                onChange={this.thayDoiEmailUpdate}/>
                                            {this.state.errorUpdate.email &&
                                            <div className="text-danger">{this.state.errorUpdate.email}</div>}
                                        </div>
                                        <div>
                                            UserName :
                                            <input
                                                className={`form-control ${this.state.errorUpdate.username ? 'is-invalid' : ''}`}
                                                style={{}}
                                                name="username" value={this.state.taiKhoanUpdate && this.state.taiKhoanUpdate.username ? this.state.taiKhoanUpdate.username : ''}
                                           disabled />
                                        </div>
                                        <div>
                                            PassWord :
                                            <input
                                                className={`form-control ${this.state.errorUpdate.password ? 'is-invalid' : ''}`}
                                                style={{}}
                                                type={"password"}
                                                name="password" value={this.state.taiKhoanUpdate && this.state.taiKhoanUpdate.password ? this.state.taiKhoanUpdate.password : ''}
                                                onChange={this.thayDoiPassUpdate}/>
                                            {this.state.errorUpdate.password &&
                                            <div className="text-danger">{this.state.errorUpdate.password}</div>}
                                        </div>
                                        <input type="submit" className="btn btn-primary" value="Update"
                                               style={{marginTop: '10px'}} onClick={this.update}/>
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

export default TaiKhoanQLUpdate