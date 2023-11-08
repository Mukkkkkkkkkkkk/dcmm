import axios from "axios";

const BASE_URL_SPCT_INDEX = "http://localhost:8080/san_pham_chi_tiet/index";
const BASE_URL_SAN_PHAM_INDEX = "http://localhost:8080/san_pham/index";
const BASE_URL_KTMS_INDEX = "http://localhost:8080/kich_thuoc_mau_sac/hien_thi";
const BASE_URL_DETAIL = "http://localhost:8080/san_pham_chi_tiet/detail";
const BASE_URL_ADD = "http://localhost:8080/san_pham_chi_tiet/add";
const BASE_URL_DELETE = "http://localhost:8080/san_pham_chi_tiet/delete";
const BASE_URL_UPDATE = "http://localhost:8080/san_pham_chi_tiet/update";

class SanPhamChiTietService{
    getSanPhamChiTiet(pageNumber){
        return axios.get(BASE_URL_SPCT_INDEX+`?page=${pageNumber}&size=5`);
    }

    getSanPham(){
        return axios.get(BASE_URL_SAN_PHAM_INDEX);
    }

    getKTMS(){
        return axios.get(BASE_URL_KTMS_INDEX);
    }

    getSanPhamChiTietById(id){
        return axios.get(BASE_URL_DETAIL+"/"+id);
    }

    addSanPhamChiTiet(spct){
        return axios.post(BASE_URL_ADD,spct);
    }

    deleteSanPhamChiTiet(id){
        return axios.delete(BASE_URL_DELETE+"/"+id);
    }

    updateSanPhamChiTiet(id,spct){
        console.log(id);
        return axios.put(BASE_URL_UPDATE+"/"+id,spct);
    }
}
export default new SanPhamChiTietService();