import axios from 'axios';

const DANHMUC_API_BASE_URL = "http://localhost:8080/danh_muc/hien_thi";
const DANHMUC_API_SAVE_URL = "http://localhost:8080/danh_muc/add";
const DANHMUC_API_DELETE_URL = "http://localhost:8080/danh_muc/delete";
const DANHMUC_API_UPDATE_URL = "http://localhost:8080/danh_muc/update";
const DANHMUC_API_UPDATEtt_URL = "http://localhost:8080/danh_muc/updatett";

class danhmucservice {


    getDanhMuc(pageNumber) {
        return axios.get(DANHMUC_API_BASE_URL + `?page=${pageNumber}&size=5`);
    }

    createDanhMuc(danhMuc) {
        return axios.post(DANHMUC_API_SAVE_URL, danhMuc)
    }

    deleteDanhMuc(danhMucId) {
        return axios.delete(DANHMUC_API_DELETE_URL + '/' + danhMucId)
    }

    getDanhMucById(danhMucId) {
        return axios.get(DANHMUC_API_BASE_URL + "/" + danhMucId);
    }

    updateDanhMuc(danhMuc, danhMucId) {
        console.log(danhMucId)
        return axios.put(DANHMUC_API_UPDATE_URL + "/" + danhMucId, danhMuc)
    }

    updateDanhMucTrangThai(trangThai, danhMucId) {
        return axios.put(DANHMUC_API_UPDATEtt_URL + "/" + danhMucId, trangThai); // Truyền trạng thái thay vì danhMuc
    }


}

export default new danhmucservice();