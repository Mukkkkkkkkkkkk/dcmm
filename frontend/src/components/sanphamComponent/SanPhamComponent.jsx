import React, {Component} from 'react';
import SanPhamService from "../../services/sanphamservice/SanPhamService";
import ReactPaginate from 'react-paginate';
import './ChonAnh.css';

class SanPhamComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sanPham:[],
            pageCount: 0
        }
        this.formAdd=this.formAdd.bind(this);
        this.delete=this.delete.bind(this);
        this.detail=this.detail.bind(this);
    }

    loadPageData(pageNumber) {
        SanPhamService.getSanPham(pageNumber).then(res => {
            this.setState({
                sanPham: res.data.content,
                pageCount: res.data.totalPages,
            });
        });
    }
    handlePageClick = data => {
        let selected = data.selected
        this.loadPageData(selected);
    };

    componentDidMount(pageNumber){
        SanPhamService.getSanPham(pageNumber).then(res => {
            this.setState({
                sanPham: res.data.content,
                pageCount: res.data.totalPages,
            });
        });
    }
    formAdd(){
        window.location.href=(`/sanpham/formadd`);
    }
    delete(id){
        SanPhamService.deleteSanPham(id).then((res)=>{
        });
        window.location.href = (`/index`);
    }
    detail(id){
        window.location.href = (`/detail/${id}`);
    }
    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Quản lý sản phẩm</h1>
                    <nav>
                    </nav>
                </div>


                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">
                                        <button className="btn btn-primary col-lg-4" onClick={this.formAdd}> Add</button>
                                    </div>


                                </div>

                            </div>

                        </div>

                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">
                                        <div className="card-body">
                                            <h5 className="card-title">Sản phẩm <span>| </span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr className="tr1">
                                                    <th>Ảnh</th>
                                                    <th>Mã</th>
                                                    <th>Tên</th>
                                                    <th>Danh mục</th>
                                                    <th>Thương hiệu</th>
                                                    <th>Xuất xứ</th>
                                                    <th>Mô tả</th>
                                                    <th>Trạng thái</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>

                                                <tbody>

                                                {
                                                    this.state.sanPham.map(
                                                        sp =>
                                                            <tr key={sp.id}>
                                                                <td><img src={`/niceadmin/img/`+sp.anh} style={{ width: '100px', height: '100px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}}/></td>
                                                                <td>{sp.ma}</td>
                                                                <td>{sp.ten}</td>
                                                                <td>{sp.danhMuc.ten}</td>
                                                                <td>{sp.thuongHieu.ten}</td>
                                                                <td>{sp.xuatXu.ten}</td>
                                                                <td>{sp.moTa}</td>
                                                                <td>{sp.trangThai===1?"HD":"Ko HD"}</td>
                                                                <td>
                                                                    <button onClick={()=>this.delete(sp.id)} className='btn btn-danger'>Xóa</button>
                                                                    <button onClick={()=>this.detail(sp.id)} className='btn btn-primary'>Chi tiết</button>
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


                    </div>

                </section>
            </div>
        )
    }
}

export default SanPhamComponent