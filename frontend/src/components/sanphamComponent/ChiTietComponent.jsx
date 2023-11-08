import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import SanPhamService from "../../services/sanphamservice/SanPhamService";
import Select from 'react-select';
import axios from "axios";
import "./ChonAnh.css";
import {toast} from "react-toastify";

class ChiTietComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            files:[],
            selectedOptionMS:null,
            selectedOptionKT:null,
            listKichThuoc:[],
            listMauSac:[],
            listSPA:[],
            listSPCT:[],
            listThuongHieu:[],
            listXuatXu:[],
            listDanhMuc:[],
            showModal:false,
            sanPham:{
                id:this.props.match.params.id,
                ma:'',
                ten:'',
                moTa:'',
                thuongHieu:'',
                xuatXu:'',
                danhMuc:''
            },
            error:{
                ten:'',
                moTa:'',
                thuongHieuId:'',
                xuatXuId:'',
                danhMucId:''
            },        };
        this.handleShowModal=this.handleShowModal.bind(this);
        this.handleCloseModal=this.handleCloseModal.bind(this);
        this.detail=this.detail.bind(this);
        this.delete=this.delete.bind(this);
        this.deleteAnh=this.deleteAnh.bind(this);
        this.updateQuality=this.updateQuality.bind(this);
        this.updatePrice=this.updatePrice.bind(this);
        this.changeSL=this.changeSL.bind(this);
        this.addSPCT=this.addSPCT.bind(this);
        this.update=this.update.bind(this);
        this.fileSelectedHandler=this.fileSelectedHandler.bind(this);
        this.handleUpload=this.handleUpload.bind(this);
        this.saveFileToPublic=this.saveFileToPublic.bind(this);
        this.thayDoiTenAdd=this.thayDoiTenAdd.bind(this);
        this.thayDoiMoTaAdd=this.thayDoiMoTaAdd.bind(this);
        this.thayDoiThuongHieuAdd=this.thayDoiThuongHieuAdd.bind(this);
        this.thayDoiXuatXuAdd=this.thayDoiXuatXuAdd.bind(this);
        this.thayDoiDanhMucAdd=this.thayDoiDanhMucAdd.bind(this);
    }

    handleChangeMS = (selectedOptionMS) => {
        this.setState({ selectedOptionMS }, () =>
            console.log(`Option selected:`, this.state.selectedOptionMS)
        );
    };
    handleChangeKT = (selectedOptionKT) => {
        this.setState({ selectedOptionKT }, () =>
            console.log(`Option selected:`, this.state.selectedOptionKT)
        );
    };
    handleShowModal = () => {this.setState({showModal:true})};
    handleCloseModal = () => {this.setState({showModal:false})};

    detail(id) {
        window.location.href = (`/sanphamchitietdetail/${id}`);
    }
    delete(id) {
        SanPhamService.deleteSanPhamChiTiet(id).then((res)=>{
            this.setState({listSPCT : this.state.listSPCT.filter(listSPCT=>listSPCT.id!==id)});
            alert(res.data);
        })

    }
    componentDidMount() {
        SanPhamService.getDanhMuc().then((res)=>{
            this.setState({listDanhMuc:res.data})
        })
        SanPhamService.getThuongHieu().then((res)=>{
            this.setState({listThuongHieu:res.data})
        })
        SanPhamService.getXuatXu().then((res)=>{
            this.setState({listXuatXu:res.data})
        })
        SanPhamService.getSanPhamById(this.state.sanPham.id).then((res)=>{
            this.setState({sanPham:res.data});
        })
        SanPhamService.getSanPhamAnhByIdSP(this.state.sanPham.id).then((res)=>{
            this.setState({listSPA:res.data});
        })
        SanPhamService.getSanPhamCTByIdSP(this.state.sanPham.id).then((res)=>{
            this.setState({listSPCT:res.data});
        })
        SanPhamService.getKichThuocAdd().then((res)=>{
            this.setState({listKichThuoc:res.data})
        })
        SanPhamService.getMauSacAdd().then((res)=>{
            this.setState({listMauSac:res.data});
        })
    }

    deleteAnh = (id,index)=>{
        const { listSPA } = this.state;
        const updatedListSPA = [...listSPA];
        updatedListSPA.splice(index, 1);
        this.setState({ listSPA: updatedListSPA });
        SanPhamService.deleteAnh(id).then((res)=>{

        })
    }
    changeSL = ()=>{
        console.log(this.state.listSPCT[0].soLuong);
    }
    updateQuality = (productId,newQuality) => {
        const updatedProducts = this.state.listSPCT.map(product =>
            product.id === productId ? { ...product, soLuong: Math.max(0,newQuality) } : product
        );
        this.setState({ listSPCT: updatedProducts });
        console.log(this.state.listSPCT[0].soLuong);
    };
    updatePrice = (productId,newQuality) => {
        const updatedProducts = this.state.listSPCT.map(product =>
            product.id === productId ? { ...product, donGia: Math.max(0,newQuality) } : product
        );
        this.setState({ listSPCT: updatedProducts });
        console.log(this.state.listSPCT[0].donGia);
    };
    addSPCT = (e)=>{
        e.preventDefault();
        var sanPham = {
            listMauSac: this.state.selectedOptionMS,
            listKichThuoc :this.state.selectedOptionKT
        }
        const id = this.props.match.params.id;
        SanPhamService.addSanPhamChiTiet(id,sanPham).then((res)=>{
            window.location.href = (`/detail/` + id);
        })
    }
    update = (e)=>{
        e.preventDefault();
        let listFile = []
        for(let i=0;i<this.state.files.length;i++){
            listFile.push(this.state.files[i].file.name);
        }
        var sanPham = {files:listFile,
            ten: this.state.sanPham.ten,
            moTa:this.state.sanPham.moTa ,
            thuongHieuId:this.state.sanPham.thuongHieu,
            xuatXuId:this.state.sanPham.xuatXu,
            danhMucId:this.state.sanPham.danhMuc,
            listMauSac: this.state.selectedOptionMS,
            listKichThuoc :this.state.selectedOptionKT
        }
        if (!this.state.sanPham.ten.trim()) {
            this.setState({error: {...this.state.error, ten: "Tên không được bỏ trống !"}});
            return;
        } else {
            this.setState({ error: { ...this.state.error, ten: "" } });
        }

        if (!this.state.error.thuongHieuId.length===0) {
            return;
        }

        if (!this.state.error.xuatXuId.length===0) {
            return;
        }

        if (!this.state.error.danhMucId.length===0) {
            return;
        }

        if (!this.state.sanPham.moTa.trim()) {
            this.setState({error: {...this.state.error, moTa: "Mô tả không được bỏ trống !"}});
            return;
        } else {
            this.setState({ error: { ...this.state.error, moTa: "" } });
        }

        console.log('nsx' + JSON.stringify(sanPham));
        let id =this.props.match.params.id;
        SanPhamService.updateSanPhamChiTiet(this.state.listSPCT).then((res)=>{

        })
        this.handleUpload()
        SanPhamService.updateSanPham(id,sanPham).then((res)=>{
            if (res.status=== 200) {
                setTimeout(() => {
                    window.location.href = (`/index`);
                }, 2000);
                toast.success("Sửa thành công!");
            }else {
                // Xử lý khi có lỗi trả về từ API
                const errorMessage = res.data.message || "Có lỗi xảy ra khi thêm sản phẩm.";
                toast.error("Lỗi: " + errorMessage);
                console.log(res.data.error)
            }
        })
    }
    removeSelectedFile = (index) => {
        const { files } = this.state;
        const updatedListFiles = [...files];
        updatedListFiles.splice(index, 1);
        this.setState({ files: updatedListFiles });
    };
    fileSelectedHandler = (e) => {
        const selectedFiles = e.target.files;
        const selectedImagesArray = Array.from(selectedFiles).map(file => ({file,URL: URL.createObjectURL(file),}));
        this.setState({ files: [ ...this.state.files,...selectedImagesArray] })
    };
    handleUpload = () => {
        if (this.state.files) {
            this.saveFileToPublic(this.state.files[0]);
        } else {
            alert('Vui lòng chọn một file');
        }
    };
    saveFileToPublic = (file) => {
        const formData1 = new FormData();
        for (const file of this.state.files) {
            formData1.append('files', file.file);
        }

        axios.post('http://localhost:8080/api/images/upload1', formData1)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error uploading files: ', error);
            });
    };
    thayDoiTenAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    ten:event.target.value
                }
            })
        );
        if(!event.target.value.trim()){
            let error = {...this.state.error,ten:"Tên không được trống !"};
            this.setState({error:error});
        }else{
            let error = {...this.state.error,ten:""};
            this.setState({error:error});
        }
    };
    thayDoiMoTaAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    moTa:event.target.value
                }
            })
        );
        if(!event.target.value.trim()){
            let error = {...this.state.error,moTa:"Mô tả không được trống !"};
            this.setState({error:error});
        }else{
            let error = {...this.state.error,moTa:""};
            this.setState({error:error});
        }
    };
    thayDoiDanhMucAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    danhMuc:event.target.value
                }
            })
        );
        if(!event.target.value.trim()){
            let error = {...this.state.error,danhMucId:"Chưa chọn danh mục !"};
            this.setState({error:error});
        }else{
            let error = {...this.state.error,danhMucId:""};
            this.setState({error:error});
        }
    };
    thayDoiThuongHieuAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    thuongHieu:event.target.value
                }
            })
        );
        if(!event.target.value.trim()){
            let error = {...this.state.error,thuongHieuId:"Chưa chọn thương hiệu !"};
            this.setState({error:error});
        }else{
            let error = {...this.state.error,thuongHieuId:""};
            this.setState({error:error});
        }
    };
    thayDoiXuatXuAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    xuatXu:event.target.value
                }
            })
        );
        if(!event.target.value.trim()){
            let error = {...this.state.error,xuatXuId:"Chưa chọn xuất xứ !"};
            this.setState({error:error});
        }else{
            let error = {...this.state.error,xuatXuId:""};
            this.setState({error:error});
        }
        console.log(`Option selected:`, this.state.selectedOptionMS)
    };
    render() {
        const { selectedOptionMS } = this.state;
        const { selectedOptionKT } = this.state;
        const popupContent = (
            <div className="popup">
                <h2>Thêm sản phẩm chi tiết</h2>
                <div>
                    <label>Kích thước : </label>
                    <Select
                        isMulti
                        value={selectedOptionKT}
                        onChange={this.handleChangeKT}
                        options={this.state.listKichThuoc}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>
                <div>
                    <label>Màu sắc : </label>
                    <Select
                        isMulti
                        value={selectedOptionMS}
                        onChange={this.handleChangeMS}
                        options={this.state.listMauSac}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>
                <br/>
                <div>
                    <button style={{float:"right"}} className="btn btn-warning bi bi-floppy" onClick={this.addSPCT}></button>
                </div>
                <div>
                </div>
            </div>
        );

        return (

            <div className="col-lg-12">
                <div className="card">

                    <div className="card-body">
                        <h5 className="card-title">Thông tin cơ bản</h5>
                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                             aria-labelledby="home-tab">
                            <form>
                                <div style={{marginLeft:"30px"}}>
                                    <label>Ảnh đã có : </label>
                                    <br/>
                                    {this.state.listSPA.map((image, index) => (
                                        <div className="image-box" key={image.id}>
                                            <img  src={'/niceadmin/img/'+ image.anh} style={{ width: '100px', height: '100px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}} />
                                            <button className="delete-button bi bi-trash" onClick={()=>this.deleteAnh(image.id,index)}></button>
                                        </div>
                                    ))}
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                </div>
                                <div style={{marginLeft:"30px"}}>


                                    <br/>
                                    <label style={{float:"none"}}>Chọn ảnh :</label>
                                    <br/>
                                    <div className="image-uploader">
                                        <label htmlFor="file-input" className="upload-btn btn btn-outline-danger">
                                            <i className="bi bi-image-fill"></i> <br/>Chọn ảnh
                                        </label>
                                        <input type="file" id="file-input" multiple={true} onChange={this.fileSelectedHandler} accept="image/*"/>

                                        {this.state.files.map((image, index) => (
                                            <div className="image-box" key={index}>
                                                <img  src={image.URL} alt={image.file.name} style={{ width: '100px', height: '100px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}} />
                                                <button className="delete-button bi bi-trash" onClick={() => this.removeSelectedFile(index)}></button>
                                            </div>
                                        ))}


                                    </div>
                                </div>
                                <br/>
                                <div style={{marginLeft:"30px"}}>
                                     Mã :
                                    <input className="form-control" defaultValue={this.state.sanPham.ma} type="text" onChange={this.thayDoiTenAdd} disabled={true}/>
                                </div>
                                <br/>
                                <div style={{marginLeft:"30px"}}>
                                    Tên :
                                    <input className={`form-control ${this.state.error.ten ? 'is-invalid' : ''}`} defaultValue={this.state.sanPham.ten} type="text" onChange={this.thayDoiTenAdd}/>
                                    {this.state.error.ten && <div className="text-danger">{this.state.error.ten}</div>}
                                </div>
                                <br/>

                                <div className="col-lg-3" style={{marginLeft:"30px",display:"inline-block"}}>
                                    <label>Thuong hiệu : </label>
                                    <select className={`form-control ${this.state.error.thuongHieuId ? 'is-invalid' : ''}`} value={this.state.sanPham.thuongHieu} onChange={this.thayDoiThuongHieuAdd}>
                                        <option value="">Chọn thương hiệu</option>
                                        {this.state.listThuongHieu.map(
                                            sp =>
                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                        )}
                                    </select>
                                    {this.state.error.thuongHieuId && <div className="text-danger">{this.state.error.thuongHieuId}</div>}
                                </div>
                                <div className="col-lg-3" style={{marginLeft:"115px",display:"inline-block"}}>
                                    <label>Xuất xứ : </label>
                                    <select className={`form-control ${this.state.error.xuatXuId ? 'is-invalid' : ''}`} value={this.state.sanPham.xuatXu} onChange={this.thayDoiXuatXuAdd}>
                                        <option value="">Chọn xuất xứ</option>
                                        {this.state.listXuatXu.map(
                                            sp =>
                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                        )}
                                    </select>
                                    {this.state.error.xuatXuId && <div className="text-danger">{this.state.error.xuatXuId}</div>}
                                </div>
                                <div className="col-lg-3" style={{marginLeft:"115px",display:"inline-block"}}>
                                    <label>Danh mục : </label>
                                    <select className={`form-control ${this.state.error.danhMucId ? 'is-invalid' : ''}`} value={this.state.sanPham.danhMuc} onChange={this.thayDoiDanhMucAdd}>
                                        <option value="">Chọn danh mục</option>
                                        {this.state.listDanhMuc.map(
                                            sp =>
                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                        )}
                                    </select>
                                    {this.state.error.danhMucId && <div className="text-danger">{this.state.error.danhMucId}</div>}
                                </div>

                                <br/>
                                <br/>
                                <div style={{marginLeft:"30px"}}>
                                    Mô tả :
                                    <textarea className={`form-control ${this.state.error.moTa ? 'is-invalid' : ''}`} defaultValue={this.state.sanPham.moTa} onChange={this.thayDoiMoTaAdd}/>
                                    {this.state.error.moTa && <div className="text-danger">{this.state.error.moTa}</div>}
                                </div>
                                <br/>
                            </form>
                        </div>

                    </div>

                </div>
                <div className="card">

                    <div className="card-body">
                        <h5 className="card-title">Thông tin chi tiết</h5>
                        <table style={{width: '100%',
                            borderCollapse: 'collapse'}}>
                            <thead>
                            <tr className={this.tr1}>
                                <th>Kích thước</th>
                                <th>Màu sắc</th>
                                <th>Số lượng </th>
                                <th>Giá</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.listSPCT.map((spct, index) => (

                                <tr key={index} className={this.tr1}>
                                    <th >{spct.kichThuoc.giaTri}</th>
                                    <th >{spct.mauSac.ten}</th>
                                    <th ><input type={"number"} value={spct.soLuong} style={{padding: 10,
                                        border: '1px solid #ddd',
                                        borderRadius: 5,width:'90%'}} onChange={(e)=>this.updateQuality(spct.id, e.target.value)} min={0}/> </th>
                                    <th ><input type={"number"} value={spct.donGia} style={{padding: 10,
                                        border: '1px solid #ddd',
                                        borderRadius: 5,width:'90%'}} onChange={(e) => this.updatePrice(spct.id, e.target.value)} min={0}/> </th>
                                    <th ><button onClick={()=>this.delete(spct.id)} className='btn btn-danger bi bi-trash3'></button></th>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button className="btn btn-primary bi bi-plus" onClick={this.handleShowModal}></button>
                        <Modal show={this.state.showModal} onHide={this.handleCloseModal} backdrop="static">
                            <Modal.Header closeButton>
                                <Modal.Title>Nhập thông tin sản phẩm</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {popupContent}
                            </Modal.Body>
                        </Modal>
                    </div>

                </div>

                <div className="card-body">
                    <button className="btn btn-warning bi bi-floppy" style={{float:"right",marginRight:20}} onClick={this.update}></button>
                    <button className="btn btn-info bi bi-house" style={{float:"right",marginRight:10}}></button>
                </div>

            </div>
        );
    }
}

export default ChiTietComponent;