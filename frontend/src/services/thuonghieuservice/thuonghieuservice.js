import axios from 'axios';
const API_BASE_URL = "http://localhost:8080/thuong_hieu/hien_thi";
const API_SAVE_URL = "http://localhost:8080/thuong_hieu/add";
const API_DELETE_URL = "http://localhost:8080/thuong_hieu/delete";
const API_UPDATE_URL = "http://localhost:8080/thuong_hieu/update";
const THUONGHIEU_API_UPDATEtt_URL = "http://localhost:8080/thuong_hieu/updatett";

class thuonghieuservice {


    
    getThuongHieu(pageNumber) {
        return axios.get(API_BASE_URL+`?page=${pageNumber}&size=5`);
    }

    createThuongHieu(thuongHieu) {
        return axios.post(API_SAVE_URL, thuongHieu)
    }

    deleteThuongHieu(thuongHieuId) {
        return axios.delete(API_DELETE_URL + '/' + thuongHieuId)
    }

    getThuongHieuById(thuongHieuId) {
        return axios.get(API_BASE_URL + "/" + thuongHieuId);
    }

    updatethuongHieu(thuongHieu, thuongHieuId) {
        console.log(thuongHieuId)
        return axios.put(API_UPDATE_URL + "/" + thuongHieuId, thuongHieu)
    }

    updateThuongHieuTrangThai(trangThai, thuongHieuId) {
        return axios.put(THUONGHIEU_API_UPDATEtt_URL + "/" + thuongHieuId, trangThai); // Truyền trạng thái thay vì thuongHieu
    }

}

export default new thuonghieuservice();