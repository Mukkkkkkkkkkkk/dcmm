import React, { Component } from 'react';
import KhuyenMaiService from "../../services/khuyenmaiservice/KhuyenMaiService";
import ReactPaginate from "react-paginate";
import { toast } from 'react-toastify';
import moment from 'moment';

class KhuyenMaiComponents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            khuyenMai: [],
            pageCount: 0,
            searchValue: "", // New state for search input value
        }
    }

    componentDidMount() {
        this.loadKhuyenMaiData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadKhuyenMaiData();
        }
    }

    loadPageData(pageNumber) {
        KhuyenMaiService.getKhuyenMai(pageNumber).then(res => {
            this.setState({
                khuyenMai: res.data.content,
                pageCount: res.data.totalPages,
            });
        });
    }

    handlePageClick = data => {
        let selected = data.selected;
        this.loadPageData(selected);
    };

    loadKhuyenMaiData(pageNumber) {
        KhuyenMaiService.getKhuyenMai(pageNumber).then(res => {
            this.setState({
                khuyenMai: res.data.content,
                pageCount: res.data.totalPages,
            });
        });

        const id = this.props.match.params.id;
        if (id) {
            KhuyenMaiService.getKhuyenMaiById(id).then((res) => {
                this.setState({ khuyenMaiUpdate: res.data });
            });
        }
    }

    detail(id) {
        window.location.href = (`/khuyenMaidetail/${id}`);
    }

    add(id) {
        window.location.href = (`/khuyenmaiadd`);
    }

    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Khuyến mãi</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">
                                        <div className="card-body">
                                            <h5 className="card-title">Khuyến mãi <span>| </span></h5>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <input
                                                    type="text"
                                                    placeholder="Tìm theo mã"
                                                    value={this.state.searchValue}
                                                    onChange={(e) => this.setState({ searchValue: e.target.value })}
                                                />
                                                <button onClick={this.add} className='btn btn-success'>
                                                    Tạo voucher
                                                </button>
                                            </div>
                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>Mã</th>
                                                    <th>Tên</th>
                                                    <th>Mô tả</th>
                                                    <th>Bắt đầu</th>
                                                    <th>Kết thúc</th>
                                                    <th>Giảm giá</th>
                                                    <th>Kiểu khuyến mãi</th>
                                                    <th>Điều kiện</th>
                                                    <th>Số lượng</th>
                                                    <th>Trạng thái</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.khuyenMai
                                                        .filter((km) => km.ma.includes(this.state.searchValue)) // Filter by "ma"
                                                        .map((km) => (
                                                            <tr key={km.id}>
                                                                <td>{km.ma}</td>
                                                                <td>{km.ten}</td>
                                                                <td>{km.moTa}</td>
                                                                <td>{moment(km.batDau).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                                <td>{moment(km.ketThuc).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                                <td>{km.giamGia}</td>
                                                                <td>{km.kieuKhuyenMai === 0 ? "Phần trăm" : km.kieuKhuyenMai === 1 ? "Tiền" : "Chọn kiểu khuyến mãi"}</td>
                                                                <td>{km.dieuKien}</td>
                                                                <td>{km.soLuong}</td>
                                                                <td>{km.trangThai === 0 ? "Đã diễn ra" : km.trangThai === 1 ? "Sắp diễn ra" : "Đang diễn ra"}</td>
                                                                <td>
                                                                    <button onClick={() => this.detail(km.id)} className='btn btn-primary'>
                                                                        Chi tiết
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
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
                                                containerClassName={"pagination justify-content-center"}
                                                activeClassName={"active"}
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
}

export default KhuyenMaiComponents;
