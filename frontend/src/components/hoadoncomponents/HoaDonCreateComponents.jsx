import React, { Component,useState  } from 'react';
import "../hoadoncomponents/HoadonCss.css";
import HoaDonService from '../../services/hoadonservice/HoaDonService';
class HoaDonCreateComponents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDashboardVisible: false ,// Trạng thái ban đầu của section dashboard,
            
        }
        this.state = {
            phanQuyen: [],

        }
        
    }
    
    componentDidMount() {
        HoaDonService.getPhanQUyen().then((res) => {
            this.setState({ phanQuyen: res.data })
        });}
        toggleDashboard = () => {
            this.setState((prevState) => ({
                isDashboardVisible: !prevState.isDashboardVisible,
            }));
        };
      
    render() {
        
        return (
            <div>
                <div className="pagetitle">
                    <h1>Tạo hóa đơn</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Overview</li>
                            <li className="breadcrumb-item active">Hóa đơn</li>
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
                    <h5 className="card-title">Thông tin sản phẩm<span></span></h5>
                    <input
                                                className='form-control'
                                                placeholder="Tìm theo tên, SĐT, mã khách hàng ... (F4)"
                                                onClick={this.toggleDashboard} // Toggle the dashboard section on click
                                            />
                                            {this.state.isDashboardVisible && ( // Conditionally render the dashboard section
                                                <section className="section dashboard">
                                                    <ul>
                                                        {this.state.phanQuyen.map((phanQuyen) => (
                                                            <li>{phanQuyen.taiKhoan.thongTinNguoiDung.ten}</li>
                                                        ))}
                                                    </ul>
                                                </section>
                                            )}
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
                                                data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                                aria-selected="false">Khách hàng
                                            </button>
                                        </li>

                                    </ul>


                                    <div className="tab-content pt-2" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                                            aria-labelledby="home-tab">
                                            <div className='container'>
                                                <h10 className="nav-link"  >
                                                    Người bán : {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.ten}
                                                </h10>

                                                <h10 className="nav-link"  >
                                                    Ngày bán : {this.state.hoaDon?.taiKhoan?.ngayTao}</h10>

                                                <h10 className="nav-link"  >
                                                    SDT : {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.sdt}</h10>

                                                {<div className="text-danger"></div>}
                                                <button type="button" class="btn btn-outline-primary">Thông tin chi tiết</button>
                                            </div>


                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div className='container'>
                                                    <h10 className="nav-link"  >
                                                        Người mua : {this.state.hoaDon?.ten}
                                                    </h10>

                                                    <h10 className="nav-link"  >
                                                        Số điện thoại : {this.state.hoaDon?.sdt}</h10>

                                                    <h10 className="nav-link"  >
                                                        Địa chỉ : {this.state.hoaDon?.phuongXa}, {this.state.hoaDon?.quanHuyen}, {this.state.hoaDon?.thanhPho}</h10>

                                                    {<div className="text-danger"></div>}
                                                    <button type="button" class="btn btn-outline-primary">Thông tin chi tiết</button>
                                                </div>

                                            </form>
                                        </div>



                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>

                </section>
                <section className="section dashboard">
                    <div className="row">

                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">


                                        <div className="card-body">
                                            <h5 className="card-title">Thông tin khách hàng<span> | </span></h5>
                                            <input className='form-control' placeholder="Tìm theo tên, SĐT, mã khách hàng ... (F4)" />
                                            <div>


                                            </div>

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

export default HoaDonCreateComponents;