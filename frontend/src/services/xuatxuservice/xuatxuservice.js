import axios from 'axios';
const API_BASE_URL = "http://localhost:8080/xuat_xu/hien_thi";
const API_SAVE_URL = "http://localhost:8080/xuat_xu/add";
const API_DELETE_URL = "http://localhost:8080/xuat_xu/delete";
const API_UPDATE_URL = "http://localhost:8080/xuat_xu/update";
const XUATXU_API_UPDATEtt_URL = "http://localhost:8080/xuat_xu/updatett";

class xuatxuservice {


    
    getXuatXu(pageNumber) {
        return axios.get(API_BASE_URL+`?page=${pageNumber}&size=5`);
    }

    createXuatXu(xuatXu) {
        return axios.post(API_SAVE_URL, xuatXu)
    }

    deleteXuatXu(xuatXuId) {
        return axios.delete(API_DELETE_URL + '/' + xuatXuId)
    }

    getXuatXuById(xuatXuId) {
        return axios.get(API_BASE_URL + "/" + xuatXuId);
    }

    updateXuatXu(xuatXu, xuatXuId) {
        console.log(xuatXuId)
        return axios.put(API_UPDATE_URL + "/" + xuatXuId, xuatXu)
    }

    updateXuatXuTrangThai(trangThai, xuatXuId) {
        return axios.put(XUATXU_API_UPDATEtt_URL + "/" + xuatXuId, trangThai); // Truyền trạng thái thay vì xuatXu
    }

}

export default new xuatxuservice();