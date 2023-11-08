import axios from 'axios';
const API_BASE_URL_PHAN_QUYEN_INDEX = "http://localhost:8080/phan_quyen/index";
const API_BASE_URL_TAI_KHOAN_INDEX = "http://localhost:8080/tai_khoan/index";
const API_BASE_URL_QUYEN_INDEX = "http://localhost:8080/quyen/hien_thi";
const API_API_BASE_URL_SAVE = "http://localhost:8080/phan_quyen/add";
const API_BASE_URL_DELETE = "http://localhost:8080/phan_quyen/delete";
const API_BASE_URL_UPDATE = "http://localhost:8080/phan_quyen/update";
class phanquyenservice {

    getPhanQuyen(pageNumber) {
        return axios.get(API_BASE_URL_PHAN_QUYEN_INDEX+`?page=${pageNumber}&size=5`);
    }
    getTaiKhoan(){
        return axios.get(API_BASE_URL_TAI_KHOAN_INDEX);
    }
    getQuyen(){
        return axios.get(API_BASE_URL_QUYEN_INDEX);
    }
    addPhanQuyen(phanQuyen) {
        return axios.post(API_API_BASE_URL_SAVE, phanQuyen)
    }

    deletePhanQuyen(id) {
        return axios.delete(API_BASE_URL_DELETE + '/' + id)
    }

    getPhanQuyenById(id) {
        return axios.get(API_BASE_URL_PHAN_QUYEN_INDEX + "/" + id);
    }

    updatePhanQuyen(phanQuyen, id) {
        console.log(id)
        return axios.put(API_BASE_URL_UPDATE + "/" + id, phanQuyen)
    }
}

export default new phanquyenservice();