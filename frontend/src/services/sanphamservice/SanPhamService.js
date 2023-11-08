import axios from "axios";

const BASE_URL_INDEX = "http://localhost:8080/san_pham/index";
const BASE_URL_DETAIL = "http://localhost:8080/san_pham/detail";
const BASE_URL_SPCT_DETAIL = "http://localhost:8080/san_pham/detail_spct";
const BASE_URL_Anh_DETAIL = "http://localhost:8080/san_pham/detail_spa";
const BASE_URL_ADD = "http://localhost:8080/san_pham/add";
const BASE_URL_DELETE = "http://localhost:8080/san_pham/delete";
const BASE_URL_SPA_DELETE = "http://localhost:8080/san_pham_anh/delete";
const BASE_URL_SPCT_ADD = "http://localhost:8080/san_pham/add_spct";
const BASE_URL_SPCT_DELETE = "http://localhost:8080/san_pham_chi_tiet/delete1";
const BASE_URL_SPCT_UPDATE = "http://localhost:8080/san_pham_chi_tiet/updateAll";
const BASE_URL_UPDATE = "http://localhost:8080/san_pham/update";
const BASE_URL_KICHTHUOC_INDEX = "http://localhost:8080/kich_thuoc/index1";
const BASE_URL_MAUSAC_INDEX = "http://localhost:8080/mau_sac/index1";
const BASE_URL_KICHTHUOCADD_INDEX = "http://localhost:8080/kich_thuoc/index";
const BASE_URL_MAUSACADD_INDEX = "http://localhost:8080/mau_sac/index";
const BASE_URL_DANHMUC_INDEX = "http://localhost:8080/danh_muc/index";
const BASE_URL_THUONGHIEU_INDEX = "http://localhost:8080/thuong_hieu/index";
const BASE_URL_XUATXU_INDEX = "http://localhost:8080/xuat_xu/index";
class SanPhamService{

    getSanPham(pageNumber){
        return axios.get(BASE_URL_INDEX+`?page=${pageNumber}&size=5`);
    }
    getKichThuoc(){
        return axios.get(BASE_URL_KICHTHUOC_INDEX);
    }

    getMauSac(){
        return axios.get(BASE_URL_MAUSAC_INDEX);
    }

    getKichThuocAdd(){
        return axios.get(BASE_URL_KICHTHUOCADD_INDEX);
    }

    getMauSacAdd(){
        return axios.get(BASE_URL_MAUSACADD_INDEX);
    }
    getDanhMuc(){
        return axios.get(BASE_URL_DANHMUC_INDEX);
    }

    getThuongHieu(){
        return axios.get(BASE_URL_THUONGHIEU_INDEX);
    }

    getXuatXu(){
        return axios.get(BASE_URL_XUATXU_INDEX);
    }

    getSanPhamById(id){
        return axios.get(BASE_URL_DETAIL+"/"+id);
    }
    getSanPhamAnhByIdSP(id){
        return axios.get(BASE_URL_Anh_DETAIL+"/"+id);
    }
    getSanPhamCTByIdSP(id){
        return axios.get(BASE_URL_SPCT_DETAIL+"/"+id);
    }
    addSanPham(sanPham){
        return axios.post(BASE_URL_ADD,sanPham);
    }

    deleteSanPham(id){
        return axios.delete(BASE_URL_DELETE+"/"+id);
    }

    updateSanPham(id,sanPham){
        console.log(id);
        return axios.put(BASE_URL_UPDATE+"/"+id,sanPham);
    }
    deleteAnh(id){
        console.log(id);
        return axios.delete(BASE_URL_SPA_DELETE+"/"+id);
    }
    updateSanPhamChiTiet(listSPCT){
        return axios.put(BASE_URL_SPCT_UPDATE,listSPCT);
    }
    deleteSanPhamChiTiet(id){
        return axios.delete(BASE_URL_SPCT_DELETE+"/"+id);
    }
    addSanPhamChiTiet(id,sanPham){
        return axios.post(BASE_URL_SPCT_ADD+"/"+id,sanPham);
    }
}
export default new SanPhamService();