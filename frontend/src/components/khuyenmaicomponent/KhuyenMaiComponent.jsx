import React, { Component } from 'react';
import KhuyenMaiService from '../../services/khuyenmaiservice/KhuyenMaiService';
import { toast } from 'react-toastify';

class KhuyenMaiComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
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
            khuyenMaiUpdate: {
                id: this.props.match.params.id,
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
            error: {
                ma: '',
                ten: '',
                moTa: '',
                batDau: '',
                ketThuc: '',
                giamGia: '',
                kieuKhuyenMai: '',
                dieuKien: '',
                soLuong: '',
                trangThai: '',
            },
            errorUpdate: {
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



        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            KhuyenMaiService.getKhuyenMaiById(id)
                .then((res) => {
                    const { ma, ten, moTa, batDau, ketThuc, giamGia, kieuKhuyenMai, dieuKien, soLuong, trangThai } = res.data;

                    const batDauDate = new Date(batDau);
                    const ketThucDate = new Date(ketThuc);

                    if (!isNaN(batDauDate) && !isNaN(ketThucDate)) {
                        this.setState({
                            khuyenMaiUpdate: {
                                ...this.state.khuyenMaiUpdate,
                                id,
                                ma,
                                ten,
                                moTa,
                                batDau: this.formatDate(batDauDate),
                                ketThuc: this.formatDate(ketThucDate),
                                giamGia,
                                kieuKhuyenMai,
                                dieuKien,
                                soLuong,
                                trangThai,
                            },
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    handleFieldChange(event, fieldType) {
        const fieldName = event.target.name;
        const value = event.target.value;

        this.setState((prevState) => ({
            [fieldType]: {
                ...prevState[fieldType],
                [fieldName]: value,
            },
            error: {
                ...prevState.error,
                [fieldName]: '', // Clear the error for this field
            },
        }));
    }

    delete(id) {
        KhuyenMaiService.deleteKhuyenMai(id).then((res) => {
            // Handle successful deletion
            this.props.history.push('/index');
        });
    }

    add = (e) => {
        e.preventDefault();
        const { khuyenMaiAdd } = this.state;
        const {
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
        } = khuyenMaiAdd;

        // Validate the form fields here, similar to what you were doing in your code
        // ...

        if (Object.values(this.state.error).some((error) => error !== '')) {
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
                    toast.success('Khuyến mãi đã được thêm thành công!');
                    const khuyenMaiMoi = res.data;
                    this.setState((prevState) => ({
                        khuyenMai: [...prevState.khuyenMai, khuyenMaiMoi],
                    }));
                    window.location.href =('/khuyenmai');
                } else {
                    toast.error('Có lỗi xảy ra khi thêm.');
                }
            })
            .catch((error) => {
                console.error('Lỗi khi thêm khuyến mãi:', error);
                toast.error('Có lỗi xảy ra khi thêm.');
            });
    };

    update = (e) => {
        e.preventDefault(); // Prevent the default form submission

        const { khuyenMaiUpdate } = this.state;
        const errorUpdate = { ma: '', ten: '', moTa: '', batDau: '', ketThuc: '', giamGia: '', kieuKhuyenMai: '', dieuKien: '', soLuong: '', trangThai: '' };
        const currentDate = new Date();
        const batDauDate = new Date(khuyenMaiUpdate.batDau);
        const ketThucDate = new Date(khuyenMaiUpdate.ketThuc);

        if (khuyenMaiUpdate.ma !== null && khuyenMaiUpdate.ma.trim() === '') {
            errorUpdate.ma = "Mã không được bỏ trống!";
        }

        if (khuyenMaiUpdate.ten !== null && khuyenMaiUpdate.ten.trim() === '') {
            errorUpdate.ten = "Tên không được bỏ trống!";
        }

        if (khuyenMaiUpdate.moTa !== null && khuyenMaiUpdate.moTa.trim() === '') {
            errorUpdate.moTa = "Mô tả không được bỏ trống!";
        }


        if (!khuyenMaiUpdate.batDau || batDauDate < currentDate) {
            errorUpdate.batDau = "Ngày bắt đầu không hợp lệ!";
        }

        if (!khuyenMaiUpdate.ketThuc || ketThucDate < batDauDate || ketThucDate < currentDate) {
            errorUpdate.ketThuc = "Ngày kết thúc không hợp lệ!";
        }

        if (khuyenMaiUpdate.kieuKhuyenMai === '0' || khuyenMaiUpdate.kieuKhuyenMai === '1') {
            const giamGiaValue = parseFloat(khuyenMaiUpdate.giamGia);
            if (isNaN(giamGiaValue) || (khuyenMaiUpdate.kieuKhuyenMai === '0' && (giamGiaValue <= 0 || giamGiaValue > 100)) || (khuyenMaiUpdate.kieuKhuyenMai === '1' && giamGiaValue <= 0)) {
                errorUpdate.giamGia = "Giảm giá không hợp lệ!";
            }
        }

        if (!khuyenMaiUpdate.dieuKien || khuyenMaiUpdate.dieuKien <= 0) {
            errorUpdate.dieuKien = "Điều kiện không hợp lệ!";
        }


        if (khuyenMaiUpdate.soLuong < 0 || isNaN(parseInt(khuyenMaiUpdate.soLuong))) {
            errorUpdate.soLuong = "Số lượng không hợp lệ!";
        }


        // Set the error state
        this.setState({ errorUpdate });

        // Check if there are any validation errors
        if (Object.values(errorUpdate).some((error) => error !== '')) {
            return;
        }

        const id = khuyenMaiUpdate.id;
        // Continue with the update logic
        KhuyenMaiService.updateKhuyenMai(id, khuyenMaiUpdate)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Khuyến mãi đã được cập nhật thành công!');
                    window.location.href = '/khuyenmai';
                } else {
                    toast.error('Có lỗi xảy ra khi cập nhật.');
                }
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật khuyến mãi:', error);
                toast.error('Có lỗi xảy ra khi cập nhật.');
            });
    };


    detail(id) {
        this.props.history.push(`/khuyenMaidetail/${id}`);
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
                                    <h5 className="card-title">
                                        Sửa <span>| xx</span>
                                    </h5>

                                    <div className="tab-content pt-2" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <form>
                                                <div>
                                                    Mã:
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.ma ? 'is-invalid' : ''}`}
                                                        name="ma"
                                                        value={this.state.khuyenMaiUpdate.ma}
                                                        onChange={(e) => this.handleFieldChange(e, 'khuyenMaiUpdate')}
                                                    />
                                                    {this.state.errorUpdate.ma && <div className="text-danger">{this.state.errorUpdate.ma}</div>}
                                                </div>
                                                <div>
                                                    Tên:
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.ten ? 'is-invalid' : ''}`}
                                                        name="ten"
                                                        value={this.state.khuyenMaiUpdate.ten}
                                                        onChange={(e) => this.handleFieldChange(e, 'khuyenMaiUpdate')}
                                                    />
                                                    {this.state.errorUpdate.ten && <div className="text-danger">{this.state.errorUpdate.ten}</div>}
                                                </div>
                                                <div>
                                                    Mô tả:
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.moTa ? 'is-invalid' : ''}`}
                                                        name="moTa"
                                                        value={this.state.khuyenMaiUpdate.moTa}
                                                        onChange={(e) => this.handleFieldChange(e, 'khuyenMaiUpdate')}
                                                    />
                                                    {this.state.errorUpdate.moTa && <div className="text-danger">{this.state.errorUpdate.moTa}</div>}
                                                </div>
                                                <div>
                                                    Bắt đầu:
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.batDau ? 'is-invalid' : ''}`}
                                                        name="batDau"
                                                        type="datetime-local"
                                                        value={this.state.khuyenMaiUpdate.batDau}
                                                        onChange={(e) => this.handleFieldChange(e, 'khuyenMaiUpdate')}
                                                    />
                                                    {this.state.errorUpdate.batDau && <div className="text-danger">{this.state.errorUpdate.batDau}</div>}
                                                </div>
                                                <div>
                                                    Kết thúc:
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.ketThuc ? 'is-invalid' : ''}`}
                                                        name="ketThuc"
                                                        type="datetime-local"
                                                        value={this.state.khuyenMaiUpdate.ketThuc}
                                                        onChange={(e) => this.handleFieldChange(e, 'khuyenMaiUpdate')}
                                                    />
                                                    {this.state.errorUpdate.ketThuc && <div className="text-danger">{this.state.errorUpdate.ketThuc}</div>}
                                                </div>
                                                <div>
                                                    Giảm giá:
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.giamGia ? 'is-invalid' : ''}`}
                                                        name="giamGia"
                                                        value={this.state.khuyenMaiUpdate.giamGia}
                                                        onChange={(e) => this.handleFieldChange(e, 'khuyenMaiUpdate')}
                                                    />
                                                    {this.state.errorUpdate.giamGia && <div className="text-danger">{this.state.errorUpdate.giamGia}</div>}
                                                </div>
                                                <div className="form-group">
                                                    <label>Kiểu khuyến mãi</label>
                                                    <select
                                                        name="kieuKhuyenMai"
                                                        id="kieuKhuyenMai"
                                                        value={this.state.khuyenMaiUpdate.kieuKhuyenMai}
                                                        className={`form-control ${this.state.errorUpdate.kieuKhuyenMai ? 'is-invalid' : ''}`}
                                                        onChange={(e) => this.handleFieldChange(e, 'khuyenMaiUpdate')}
                                                    >
                                                        <option value="">Chọn kiểu khuyến mãi</option>
                                                        <option value="0">Phần trăm</option>
                                                        <option value="1">Tiền</option>
                                                    </select>
                                                    {this.state.errorUpdate.kieuKhuyenMai && <div className="text-danger">{this.state.errorUpdate.kieuKhuyenMai}</div>}
                                                </div>
                                                <div>
                                                    Điều kiện:
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.dieuKien ? 'is-invalid' : ''}`}
                                                        name="dieuKien"
                                                        value={this.state.khuyenMaiUpdate.dieuKien}
                                                        onChange={(e) => this.handleFieldChange(e, 'khuyenMaiUpdate')}
                                                    />
                                                    {this.state.errorUpdate.dieuKien && <div className="text-danger">{this.state.errorUpdate.dieuKien}</div>}
                                                </div>
                                                <div>
                                                    Số lượng:
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.soLuong ? 'is-invalid' : ''}`}
                                                        name="soLuong"
                                                        value={this.state.khuyenMaiUpdate.soLuong}
                                                        onChange={(e) => this.handleFieldChange(e, 'khuyenMaiUpdate')}
                                                    />
                                                    {this.state.errorUpdate.soLuong && <div className="text-danger">{this.state.errorUpdate.soLuong}</div>}
                                                </div>
                                                <div className="form-group">
                                                    <label>Trạng thái</label>
                                                    <select
                                                        name="trangThai"
                                                        id="trangThai"
                                                        value={this.state.khuyenMaiUpdate.trangThai}
                                                        className={`form-control ${this.state.errorUpdate.trangThai ? 'is-invalid' : ''}`}
                                                        onChange={(e) => this.handleFieldChange(e, 'khuyenMaiUpdate')}
                                                    >
                                                        <option value="">Chọn trạng thái</option>
                                                        <option value="1">Sắp diễn ra</option>
                                                        <option value="0">Đã diễn ra</option>
                                                        <option value="2">Đang diễn ra</option>
                                                    </select>
                                                    {this.state.errorUpdate.trangThai && <div className="text-danger">{this.state.errorUpdate.trangThai}</div>}
                                                </div>

                                                <button className="btn btn-primary" style={{ marginTop: '10px' }} onClick={this.update}>
                                                    Update
                                                </button>                                            </form>
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

export default KhuyenMaiComponent