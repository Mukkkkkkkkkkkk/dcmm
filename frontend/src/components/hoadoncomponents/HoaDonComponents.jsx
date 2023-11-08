import React, { Component } from 'react';
import HoaDonService from '../../services/hoadonservice/HoaDonService';
import "../hoadoncomponents/HoadonCss.css"
import _ from 'lodash'; // Import lodash
import ReactPaginate from 'react-paginate';
class HoaDonComponents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hoaDon: [],
            sortedColumn: null,
            isSortAsc: true,
            searchTerm: '',
            currentPage: 0, // Trang hiện tại
            perPage: 3, // Số mục trên mỗi trang// Initialize searchTerm
        }
        // this.detail = this.detail.bind(this);
    }
    handlePageClick = (data) => {
        this.setState({ currentPage: data.selected });
    }

    componentDidMount() {
        HoaDonService.getHoaDon().then((res) => {
            this.setState({ hoaDon: res.data })
        });
        const storedSearchTerm = localStorage.getItem('searchTerm');
        if (storedSearchTerm) {
            this.setState({ searchTerm: storedSearchTerm });
        }
    }
    handleSearch = (event) => {
        const searchTerm = event.target.value;
        this.setState({ searchTerm });

        // Lưu trạng thái tìm kiếm vào localStorage
        localStorage.setItem('searchTerm', searchTerm);
    }
    handleStatusFilter = (filterValue) => {
        this.setState({ searchTerm: filterValue });
    }

    // Phương thức này trả về dữ liệu đã được lọc dựa trên giá trị tìm kiếm
    filteredData = () => {
        const { hoaDon, searchTerm } = this.state;

        return _.filter(hoaDon, (item) => {
            // Combine the values of the columns you want to search in
            const searchValues = (
                (item.ten && item.ten !== null ? item.ten : "Khách lẻ") +
                (item.maHoaDon) + (item.ngayTao) +
                (item.sdt) +
                (item.trangThai === 1 ? "Đã thanh toán" : item.trangThai === 2 ? "Chưa thanh toán" : "Chờ")
            ).toLowerCase();

            switch (searchTerm) {
                case "1":
                    return item.trangThai === 1; // Filter for "Đã thanh toán"
                case "2":
                    return item.trangThai == 2; // Filter for "Chưa thanh toán"
                case "3":
                    return item.trangThai == 3; // Filter for "Chờ"
                default:
                    return searchValues.includes(searchTerm.toLowerCase());
            }
        });
    }
    detail(id) {
        window.location.href = (`/HoaDonChiTiet/${id}`);
    }
    handleDetailClick = (id) => {
        // Redirect to the detail page or perform any other action you need
        window.location.href = `/HoaDonChiTiet/${id}`;
    }
    handleSort = (column) => {
        const { hoaDon, sortedColumn, isSortAsc } = this.state;

        // Sắp xếp dữ liệu theo cột được chọn
        const sortedData = _.orderBy(hoaDon, [column], [isSortAsc ? 'asc' : 'desc']);

        this.setState({
            hoaDon: sortedData,
            sortedColumn: column,
            isSortAsc: !isSortAsc
        });
    }
    getStatusColor = (status) => {
        switch (status) {
            case 1:
                return 'green'; // Đã hoàn thành (màu xanh)
            case 2:
                return 'red'; // Chưa thanh toán (màu đỏ)
            case 3:
                return 'yellow'; // Chờ (màu vàng)
            default:
                return 'black'; // Default color (or another color of your choice)
        }
    }

    getStatusText = (status) => {
        switch (status) {
            case 1:
                return 'Đã hoàn thành';
            case 2:
                return 'Chưa thanh toán';
            case 3:
                return 'Chờ';
            default:
                return 'Không xác định'; // Default text (or another text of your choice)
        }
    }
    handleSearchFocus = () => {
        // Đặt trang hiện tại về 0 để nhảy về trang đầu tiên
        this.setState({ currentPage: 0 });
    }
    render() {
        const searchTerm = localStorage.getItem('searchTerm') || this.state.searchTerm;

        const { currentPage, perPage } = this.state;
        const hoaDonList = this.filteredData();
        const offset = currentPage * perPage;
        const currentHoaDonList = hoaDonList.slice(offset, offset + perPage);
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


                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-13">
                            <div className="row">
                                <div className="col-13">
                                    <div className="card recent-sales overflow-auto">
                                        <br />
                                        <br />
                                        <div className="col-13">
                                            <div className="row">
                                                <div className="col-6 container">
                                                <input
    type="text"
    name="query"
    placeholder="Tìm kiếm"
    title="Enter search keyword"
    value={searchTerm}
    onChange={this.handleSearch}
    onFocus={this.handleSearchFocus} // Thêm sự kiện onFocus
/>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            id="filterAll"
                                                            name="statusFilter"
                                                            value=""
                                                            checked={this.state.searchTerm === ""}
                                                            onChange={() => this.handleStatusFilter("")}
                                                            className="form-check-input"
                                                        />
                                                        <label htmlFor="filterAll" className="form-check-label">Tất cả</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            id="filterPaid"
                                                            name="statusFilter"
                                                            value="1"
                                                            checked={this.state.searchTerm === "1"}
                                                            onChange={() => this.handleStatusFilter("1")}
                                                            className="form-check-input"
                                                        />
                                                        <label htmlFor="filterPaid" className="form-check-label">Đã thanh toán</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            id="filterUnpaid"
                                                            name="statusFilter"
                                                            value="2"
                                                            checked={this.state.searchTerm === "2"}
                                                            onChange={() => this.handleStatusFilter("2")}
                                                            className="form-check-input"
                                                        />
                                                        <label htmlFor="filterUnpaid" className="form-check-label">Chưa thanh toán</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            id="filterPending"
                                                            name="statusFilter"
                                                            value="3"
                                                            checked={this.state.searchTerm === "3"}
                                                            onChange={() => this.handleStatusFilter("3")}
                                                            className="form-check-input"
                                                        />
                                                        <label htmlFor="filterPending" className="form-check-label">Chờ</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Hóa đơn <span>|</span></h5>
                                            <table className="table table-borderless datatable">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Mã Hóa Đơn</th>
                                                        <th>Mã Nhân Viên</th>
                                                        <th>Tên Khách Hàng</th>
                                                        <th>SĐT Khách Hàng</th>
                                                        <th onClick={() => this.handleSort('ngayTao')}>Ngày Mua {this.renderSortIcon('ngayTao')}</th>
                                                        <th onClick={() => this.handleSort('ngayCapNhat')}>Ngày cập nhật {this.renderSortIcon('ngayCapNhat')}</th>
                                                        <th>Thạng thái</th>
                                                        <th>Ghi chú</th>
                                                        <th>Khách Phải Trả</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentHoaDonList.map(
                                                            (hoaDon, index) =>
                                                                <tr key={hoaDon.id}>

                                                                    <td>{index + 1}</td>
                                                                    <td>{hoaDon.maHoaDon}</td>
                                                                    <td>{hoaDon.taiKhoan.maTaiKhoan}</td>
                                                                    <td>{hoaDon && hoaDon.ten !== null ? hoaDon.ten : "Khách lẻ"}</td>
                                                                    <td>{hoaDon && hoaDon.sdt !== null ? hoaDon.sdt : "Khách lẻ"}</td>
                                                                    <td>{hoaDon.ngayTao}</td>
                                                                    <td>{hoaDon.ngayCapNhat}</td>
                                                                    <td style={{ color: this.getStatusColor(hoaDon.trangThai) }}>
                                                                        {this.getStatusText(hoaDon.trangThai)}
                                                                    </td>
                                                                    <td>{hoaDon.ghiChu}</td>
                                                                    <td>{hoaDon.tongTienSauGiam.toLocaleString()}</td>
                                                                    <td><a onClick={() => this.detail(hoaDon.id)}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAi1JREFUSEvF10vITVEUwPHflzL0yjvJQBETGRBFpIgJMTEzUEQGyiMywEQpFMUAmRuIGUqEZMDAK0mEMpBXiBGhpX20ne+e795zz823Jve271r7v9djr7Vvn0GSvkHiagceiVmYidEdHvI9HuEePlXZVIEn4hjWdAirUjuLLYjD/COtwDNwBRMaQgvzF1iC+PwrZfBk3MWYpHEOJ3C15iECFJ6uSnYBnZN7XgZfwMqkvB2HawLL6nuxLy2exMZCIQeHt6/SD5GbtQ2hhfklLMN3RLF+ix9y8HqcTtpRyfdrgofjcwubpbic1lfgYhm8GweSwhD8rAGOQryV6uFQyW4UPqS1rThaBkcuIifl9Xb8oXiAaUlxT+ZAYfsrfdlf5DwPdTfgIrybcTxt/hrTi1ymtZ6CY/Mb2IUz2ITwaG75zqJn4IBex9jk0QacwoiKNtkTcOQyoOOy5Edvnp2uTKuaaAyeipsYn+3+BAvxboAqbASegttdQOM8XYMDGp5Oyrx6hvltPG10nSKsd1pAF+BNu0ve5DotwrUM8BLzakC7DnUODmh4Gk2iUxmW9fBtONJpy4y7GUMj5DHedkpMeouzeb4a5zsF1+T0U4/JFBPqRxqLX/8H+CB2pqNEZ4sO90eaDomqaMQrJl4by5PC89TDi/FYCW4a3tz+aQp18brp53FMl3jY9VJiau3Ax/Kmeahjtq5DvBiaSFT9w/R0+lK1Ubt/Ek0OMKDtoIF/AxLsgR+5iHZvAAAAAElFTkSuQmCC" /></a></td>


                                                                </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                            <ReactPaginate
                                                pageCount={Math.ceil(hoaDonList.length / perPage)}
                                                pageRangeDisplayed={5}
                                                marginPagesDisplayed={2}
                                                onPageChange={this.handlePageClick}
                                                containerClassName={'pagination'}
                                                activeClassName={'active'}
                                            />
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
    renderSortIcon(column) {
        const { sortedColumn, isSortAsc } = this.state;
        if (sortedColumn === column) {
            return isSortAsc ? <i className="fa fa-sort-asc"></i> : <i className="fa fa-sort-desc"></i>;
        }
        return null;
    }
}

export default HoaDonComponents;