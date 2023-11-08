import axios from 'axios';
const API_BASE_URL = "http://localhost:8080/kich_thuoc/hien_thi";
const API_SAVE_URL = "http://localhost:8080/kich_thuoc/add";
const API_DELETE_URL = "http://localhost:8080/kich_thuoc/delete";
const API_UPDATE_URL = "http://localhost:8080/kich_thuoc/update";
const KICHTHUOC_API_UPDATEtt_URL = "http://localhost:8080/kich_thuoc/updatett";


class kichthuocservice {


    
    getKichThuoc(pageNumber) {
        return axios.get(API_BASE_URL+`?page=${pageNumber}&size=5`);
    }

    createKichThuoc(kichThuoc) {
        return axios.post(API_SAVE_URL, kichThuoc)
    }

    deleteKichThuoc(kichThuocId) {
        return axios.delete(API_DELETE_URL + '/' + kichThuocId)
    }

    getKichThuocById(kichThuocId) {
        return axios.get(API_BASE_URL + "/" + kichThuocId);
    }

    updateKichThuoc(kichThuoc, kichThuocId) {
        console.log(kichThuocId)
        return axios.put(API_UPDATE_URL + "/" + kichThuocId, kichThuoc)
    }

    updateKichThuocTrangThai(trangThai, kichThuocId) {
        return axios.put(KICHTHUOC_API_UPDATEtt_URL + "/" + kichThuocId, trangThai); // Truyền trạng thái thay vì danhMuc
    }

}

export default new kichthuocservice();