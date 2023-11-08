import React, { Component } from 'react';
import KhuyenMaiService from "../../services/khuyenmaiservice/KhuyenMaiService";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

class KhuyenMaiComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            khuyenMai: [],
            pageCount: 0,
            khuyenMaiAdd: {
                ma: '',
                ten: '',
                moTa: '',
                batDau: '',
                ketThuc: '',
                giamGia: '',
                kieuKhuyenMai: '0',
                dieuKien: '',
                soLuong: '',
                trangThai: '0',
            },
            errorAdd: {
                ma: '',
                ten: '',
                moTa: '',
                batDau: '',
                ketThuc: '',
                giamGia: '',
                dieuKien: '',
                soLuong: '',
            },
        };

        this.add = this.add.bind(this);
        this.thayDoiTruongAdd = this.thayDoiTruongAdd.bind(this);
    }

    add = (e) => {
        e.preventDefault();
        const { khuyenMaiAdd } = this.state;
        const { ma, ten, moTa, batDau, ketThuc, giamGia, kieuKhuyenMai, dieuKien, soLuong, trangThai } = khuyenMaiAdd;

        // Tạo một bản sao của errorAdd để xóa tất cả lỗi trước đó
        let errorAdd = {
            ma: '',
            ten: '',
            moTa: '',
            batDau: '',
            ketThuc: '',
            giamGia: '',
            dieuKien: '',
            soLuong: '',
        };

        if (!ma || !ma.trim() || /[\s!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\\/-]+/.test(ma)) {
            errorAdd.ma = "Mã không được bỏ trống hoặc chứa khoảng trắng hoặc kí tự đặc biệt!";
        }

        if (!ten || !ten.trim() || /[\s!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\\/-]+/.test(ten)) {
            errorAdd.ten = "Tên không được bỏ trống hoặc chứa khoảng trắng hoặc kí tự đặc biệt!";
        }


            if (!moTa || !moTa.trim() || moTa.trim() === "") {
                errorAdd.moTa = "Mô tả không được bỏ trống hoặc chỉ chứa khoảng trắng!";
            }


            const currentDate = new Date();
        const batDauDate = new Date(batDau);
        const ketThucDate = new Date(ketThuc);

        if (!batDau.trim() || batDauDate < currentDate) {
            errorAdd.batDau = "Ngày bắt đầu không hợp lệ!";
        }

        if (!ketThuc.trim() || ketThucDate < batDauDate || ketThucDate < currentDate) {
            errorAdd.ketThuc = "Ngày kết thúc không hợp lệ!";
        }

        if (!giamGia.trim() || isNaN(parseFloat(giamGia)) || /[a-zA-Z]+/.test(giamGia)) {
            errorAdd.giamGia = "Giảm giá không hợp lệ!";
        }


        if (kieuKhuyenMai === '1') { // Phần trăm
            const giamGiaValue = parseFloat(giamGia);
            if (giamGiaValue <= 0 || giamGiaValue > 100) {
                errorAdd.giamGia = "Phần trăm giảm giá phải nằm trong khoảng 1-100!";
            }
        } else if (kieuKhuyenMai === '2') { // Tiền
            const giamGiaValue = parseFloat(giamGia);
            if (giamGiaValue <= 0) {
                errorAdd.giamGia = "Số tiền giảm giá phải lớn hơn 0!";
            }
        }

        if (!dieuKien.trim() || isNaN(parseInt(dieuKien)) || parseInt(dieuKien) < 0 || /[a-zA-Z]+/.test(dieuKien)) {
            errorAdd.dieuKien = "Điều kiện không hợp lệ!";
        }

        if (!soLuong.trim() || isNaN(parseInt(soLuong)) || parseInt(soLuong) < 0 || /[a-zA-Z]+/.test(soLuong)) {
            errorAdd.soLuong = "Số lượng không hợp lệ!";
        }


        if (Object.values(errorAdd).some((error) => error !== '')) {
            this.setState({ errorAdd });
            return;
        }

        const newKhuyenMai = {
            ma,
            ten,
            moTa,
            batDau,
            ketThuc,
            giamGia,
            kieuKhuyenMai,
            dieuKien,
            soLuong,
            trangThai,
        };

        KhuyenMaiService.createKhuyenMai(newKhuyenMai)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Khuyến mãi đã được thêm thành công!");
                    const khuyenMaiMoi = res.data;
                    this.setState((prevState) => ({
                        khuyenMai: [...prevState.khuyenMai, khuyenMaiMoi],
                    }));
                    window.location.href =('/khuyenmai'); // Sử dụng props.history để chuyển hướng
                } else {
                    toast.error("Có lỗi xảy ra khi thêm.");
                }
            })
            .catch((error) => {
                console.error("Lỗi khi thêm khuyến mãi:", error);
                toast.error("Có lỗi xảy ra khi thêm.");
            });
    };

    thayDoiTruongAdd(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
        this.setState((prevState) => ({
            khuyenMaiAdd: {
                ...prevState.khuyenMaiAdd,
                [fieldName]: value,
            },
        }));
    }

    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Khuyến mãi</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-10">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">ADD<span>| xx</span></h5>
                                    <form>
                                        <div className='form-group'>
                                          <label>Mã: <span style={{color: "red"}}>*</span></label>
                                            <input className={`form-control ${this.state.errorAdd.ma ? 'is-invalid' : ''}`} name="ma" onChange={this.thayDoiTruongAdd}/>
                                            {this.state.errorAdd.ma && <div className="text-danger">{this.state.errorAdd.ma}</div>}
                                        </div>
                                        <div className='form-group'>
                                            <label>Tên: <span style={{color: "red"}}>*</span></label>
                                            <input className={`form-control ${this.state.errorAdd.ten ? 'is-invalid' : ''}`} name="ten" onChange={this.thayDoiTruongAdd}/>
                                            {this.state.errorAdd.ten && <div className="text-danger">{this.state.errorAdd.ten}</div>}
                                        </div>
                                        <div className='form-group'>
                                            <label>Mô tả: <span style={{color: "red"}}>*</span></label>
                                            <input className={`form-control ${this.state.errorAdd.moTa ? 'is-invalid' : ''}`} name="moTa" onChange={this.thayDoiTruongAdd}/>
                                            {this.state.errorAdd.moTa && <div className="text-danger">{this.state.errorAdd.moTa}</div>}
                                        </div>
                                        <div className='form-group'>
                                            <label>Bắt đầu: <span style={{color: "red"}}>*</span></label>
                                            <input className={`form-control ${this.state.errorAdd.batDau ? 'is-invalid' : ''}`} name="batDau" type="datetime-local" onChange={this.thayDoiTruongAdd}/>
                                            {this.state.errorAdd.batDau && <div className="text-danger">{this.state.errorAdd.batDau}</div>}
                                        </div>
                                        <div className='form-group'>
                                            <label>Kết thúc: <span style={{color: "red"}}>*</span></label>
                                            <input className={`form-control ${this.state.errorAdd.ketThuc ? 'is-invalid' : ''}`} name="ketThuc" type="datetime-local" onChange={this.thayDoiTruongAdd}/>
                                            {this.state.errorAdd.ketThuc && <div className="text-danger">{this.state.errorAdd.ketThuc}</div>}
                                        </div>
                                        <div className='form-group'>
                                            <label>Kiểu khuyến mãi <span style={{color: "red"}}>*</span></label>
                                            <select name="kieuKhuyenMai" id="kieuKhuyenMai" className="form-control" onChange={this.thayDoiTruongAdd}>
                                                <option value="2">Chọn kiểu khuyến mãi</option>
                                                <option value="0">Phần trăm</option>
                                                <option value="1">Tiền</option>
                                            </select>
                                        </div>
                                        <div className='form-group'>
                                            <label>Giảm giá: <span style={{color: "red"}}>*</span></label>
                                            <input className={`form-control ${this.state.errorAdd.giamGia ? 'is-invalid' : ''}`} name="giamGia" onChange={this.thayDoiTruongAdd}/>
                                            {this.state.errorAdd.giamGia && <div className="text-danger">{this.state.errorAdd.giamGia}</div>}
                                        </div>

                                        <div className='form-group'>
                                            <label>Điều kiện: <span style={{color: "red"}}>*</span></label>
                                            <input className={`form-control ${this.state.errorAdd.dieuKien ? 'is-invalid' : ''}`} name="dieuKien" onChange={this.thayDoiTruongAdd}/>
                                            {this.state.errorAdd.dieuKien && <div className="text-danger">{this.state.errorAdd.dieuKien}</div>}
                                        </div>
                                        <div className='form-group'>
                                            <label>Số lượng: <span style={{color: "red"}}>*</span></label>
                                            <input className={`form-control ${this.state.errorAdd.soLuong ? 'is-invalid' : ''}`} name="soLuong" onChange={this.thayDoiTruongAdd}/>
                                            {this.state.errorAdd.soLuong && <div className="text-danger">{this.state.errorAdd.soLuong}</div>}
                                        </div>
                                        <div className='form-group'>
                                            <label>Trạng thái: <span style={{color: "red"}}>*</span></label>
                                            <select name="trangThai" id="trangThai" className="form-control" onChange={this.thayDoiTruongAdd}>
                                                <option value="0">Đã diễn ra</option>
                                                <option value="1">Sắp diễn ra</option>
                                                <option value="2">Đang diễn ra</option>
                                            </select>
                                        </div>
                                        <input type="submit" className="btn btn-primary" value="Add" style={{ marginTop: '10px' }} onClick={this.add} />
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

export default KhuyenMaiComponent;
