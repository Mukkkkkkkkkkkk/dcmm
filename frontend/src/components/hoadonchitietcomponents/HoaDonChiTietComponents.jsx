import React, { Component } from 'react';
import HoaDonChiTietService from '../../services/hoadonchitietservice/HoaDonChiTietService';
import HoaDonService from '../../services/hoadonservice/HoaDonService';
import { Modal, Button } from 'react-bootstrap';
import { tichDiemDaCoTaiKhoan, tichDiemMoi } from "../tichdiemcomponent/TichDiemService";
import 'font-awesome/css/font-awesome.min.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css"></link>
class HoaDonChiTietComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoaDonChiTiet: [],
            hoaDonId: {
                id: this.props.match.params.id
            },
            hoaDon: {
                id: this.props.match.params.id,
                thanhToan: '',
                taiKhoan: ''
            },
            sdt: '',
            diem: '',
            result: '',
            showModal: false,
        };
    }

    componentDidMount() {
        HoaDonChiTietService.detailHDCT(this.state.hoaDonId.id).then((res) => {
            this.setState({ hoaDonChiTiet: res.data });
        });
        HoaDonService.getOneHD(this.state.hoaDonId.id).then((res) => {
            this.setState({ hoaDon: res.data });
        });
    }

    handleShowModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    handleTimTaiKhoan = async () => {
        // Code xử lý tìm kiếm tài khoản theo số điện thoại
        // Gọi API hoặc thực hiện tìm kiếm tại đây và cập nhật tài khoản ID
    };

    handleTichDiemDaCoTaiKhoan = async () => {
        const message = await tichDiemDaCoTaiKhoan(this.state.sdt, this.state.diem);
        this.setState({ result: message });
    };

    handleTichDiemMoi = async () => {
        const message = await tichDiemMoi(this.state.sdt, this.state.diem);
        this.setState({ result: message });
    };

    getCircleColor(trangThai) {
        switch (trangThai) {
            case 1:
                return 'green'; // Duyệt
            case 2:
                return 'blue'; // Đóng gói
            case 3:
                return 'orange';  // Xuất kho
            case 4:
                return 'yellow'; // Hoàn thành
            default:
                return '#555'; // Trạng thái mặc định
        }
    }

    getCircleBackgroundColor(trangThai) {
        switch (trangThai) {
            case 1:
                return '#e0e0e0'; // Màu mặc định
            case 2:
                return '#e0e0e0'; // Màu mặc định
            case 3:
                return '#e0e0e0';  // Màu mặc định
            case 4:
                return '#e0e0e0'; // Màu mặc định
            default:
                return 'white'; // Màu nền mặc định (thay đổi theo ý muốn)
        }
    }

    render() {
        let total = 0;

        return (
            
            <div>
                <div className="pagetitle">
                    <h1>Hóa đơn</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Overview</li>
                            <li className="breadcrumb-item active">Hóa đơn</li>
                        </ol>
                    </nav>
                </div>

                <div>
            {/* ... Các phần mã khác ở đây ... */}
            <div>
            {/* ... Các phần mã khác ở đây ... */}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {Array.from(Array(4).keys()).map((index) => {
                    const trangThai = index + 1;
                    const isActive = this.state.hoaDon.trangThai >= trangThai;

                    return (
                        <div style={{ textAlign: 'center', flex: 1 }} key={trangThai}>
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: isActive ? 'green' : '#e0e0e0',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    color: isActive ? 'white' : '#555',
                                    margin: '0 auto 10px',
                                }}
                            >
                                {trangThai}
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                {trangThai === 1 ? 'Duyệt' : trangThai === 2 ? 'Đóng gói' : trangThai === 3 ? 'Xuất kho' : 'Hoàn thành'}
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Kết nối các ô trạng thái bằng các đường kẻ */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <div style={{ flex: 1, height: '10px', backgroundColor: this.state.hoaDon.trangThai >= 2 ? 'green' : '#e0e0e0' }}></div>
                <div style={{ flex: 1, height: '10px', backgroundColor: this.state.hoaDon.trangThai >= 3 ? 'green' : '#e0e0e0' }}></div>
                <div style={{ flex: 1, height: '10px', backgroundColor: this.state.hoaDon.trangThai >= 4 ? 'green' : '#e0e0e0' }}></div>
            </div>

            {/* ... Các phần mã khác tiếp tục ở đây ... */}
        </div>
        </div>
                <br />
               
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">
                                        <div className="card-body">
                                            <h5 className="card-title">Thông tin sản phẩm<span>| </span></h5>
                                            <div>
                                                <table className="table table-borderless datatable">
                                                    <thead>
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Số Lượng</th>
                                                            <th>Ảnh</th>
                                                            <th>Tên sản phẩm</th>
                                                            <th>Đơn giá</th>
                                                            <th>Thành tiền</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.hoaDonChiTiet.map((hoaDonChiTiet, index) => {
                                                            total += hoaDonChiTiet.sanPhamChiTiet.donGia * hoaDonChiTiet.soLuong; // Cộng dồn tổng

                                                            return (
                                                                <tr key={hoaDonChiTiet.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{hoaDonChiTiet.soLuong}</td>
                                                                    <td>
                                                                        <img
                                                                            // src={hoaDonChiTiet.sanPhamChiTiet.sanPham.imageURL}
                                                                            // alt={hoaDonChiTiet.sanPhamChiTiet.sanPham.ten}
                                                                            style={{ width: '50px', height: '50px' }}
                                                                        />
                                                                    </td>
                                                                    <td>{hoaDonChiTiet.sanPhamChiTiet.sanPham.ten}</td>
                                                                    <td>{hoaDonChiTiet.sanPhamChiTiet.donGia.toLocaleString()} VNĐ</td>
                                                                    <td>{(hoaDonChiTiet.sanPhamChiTiet.donGia * hoaDonChiTiet.soLuong).toLocaleString()} VNĐ</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                                <div className="text-right mt-3">
                                                    <label>Tổng: {total.toLocaleString()} VNĐ</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Thông tin <span>| xx</span></h5>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab"
                                                data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                                aria-selected="true">Người tạo
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab"
                                                data-bs-target="#profile" type of="button" role="tab"
                                                aria-controls="profile"
                                                aria-selected="false">Khách hàng
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="contact-tab" data-bs-toggle="tab"
                                                data-bs-target="#contact" type="button" role="tab"
                                                aria-controls="contact"
                                                aria-selected="false">Detail
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content pt-2" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                                            aria-labelledby="home-tab">
                                            <div>
                                                <h10 className="nav-link">
                                                    Người bán : {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.ten}
                                                </h10>
                                                <h10 className="nav-link">
                                                    Ngày bán : {this.state.hoaDon?.taiKhoan?.ngayTao}</h10>
                                                <h10 className="nav-link">
                                                    Ghi chú : {this.state.hoaDon?.ghiChu}</h10>
                                                <div>
                                                    <Button variant="btn btn-outline-primary" onClick={this.handleShowModal}>
                                                        Thông tin chi tiết
                                                    </Button>
                                                    <Modal show={this.state.showModal} onHide={this.handleCloseModal} backdrop="static">
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Thông tin nhân viên</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <h10 className="nav-link">
                                                                Avatar
                                                            </h10>
                                                            <img
                                                                // src={hoaDonChiTiet.sanPhamChiTiet.sanPham.imageURL}
                                                                // alt={hoaDonChiTiet.sanPhamChiTiet.sanPham.ten}
                                                                style={{ width: '55px', height: '70px' }}
                                                            />
                                                            <h10 className="nav-link">
                                                                Tên : {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.ten}</h10>
                                                            <h10 className="nav-link">
                                                                Địa chỉ : {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.diaChi}</h10>
                                                            <h10 className="nav-link">
                                                                Số điện thoại : {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.sdt}</h10>
                                                            <h10 className="nav-link">
                                                                Ngày sinh : {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.ngaySinh}</h10>
                                                            <h10 className="nav-link">
                                                                Giới tính :  {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.gioiTinh === 1 ? "Nữ" : "Nam"}</h10>
                                                            {this.popupContent}
                                                        </Modal.Body>
                                                    </Modal>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="profile" role="tabpanel"
                                            aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    <h10 className="nav-link">
                                                        Người mua: {this.state.hoaDon?.ten}</h10>
                                                    <h10 className="nav-link">
                                                        Địa chỉ: {this.state.hoaDon?.phuongXa}, {this.state.hoaDon?.quanHuyen}, {this.state.hoaDon?.thanhPho}</h10>
                                                    <h10 className="nav-link">
                                                        Số điện thoại: {this.state.hoaDon?.sdt}</h10>
                                                    <h10 className="nav-link">
                                                        Email:{this.state.hoaDon && this.state.hoaDon.email !== null ? this.state.hoaDon.email : "--+--"}</h10>

                                                </div>
                                            </form>
                                        </div>
                                        <div className="tab-pane fade" id="contact" role="presentation"
                                            aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    <h10 className="nav-link">
                                                        Người mua: {this.state.hoaDon?.ten}</h10>
                                                    <h10 className="nav-link">
                                                        Địa chỉ: {this.state.hoaDon?.phuongXa}, {this.state.hoaDon?.quanHuyen}, {this.state.hoaDon?.thanhPho}</h10>
                                                    <h10 className="nav-link">
                                                        Số điện thoại: {this.state.hoaDon?.sdt}</h10>
                                                    <h10 className="nav-link">
                                                        Email:{this.state.hoaDon && this.state.hoaDon.email !== null ? this.state.hoaDon.email : "--+--"}</h10>

                                                </div>
                                            </form>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>

                </section>
                <div>
  
</div>
            </div>
        );
    }
}

export default HoaDonChiTietComponents;