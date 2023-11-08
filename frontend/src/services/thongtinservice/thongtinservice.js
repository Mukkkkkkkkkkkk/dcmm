import axios from 'axios';
const API_BASE_URL = "http://localhost:8080/thong_tin/index";
const API_SAVE_URL = "http://localhost:8080/thong_tin/add";
const API_DELETE_URL = "http://localhost:8080/thong_tin/delete";
const API_UPDATE_URL = "http://localhost:8080/thong_tin/update";


class thongtinservice {



    getThongTin(pageNumber) {
        return axios.get(API_BASE_URL+`?page=${pageNumber}&size=5`);
    }

    addThongTin(thongTin) {
        return axios.post(API_SAVE_URL, thongTin)
    }

    deleteThongTin(id) {
        return axios.delete(API_DELETE_URL + '/' + id)
    }

    getThongTinById(id) {
        return axios.get(API_BASE_URL + "/" + id);
    }

    updateThongTin(thongTin, id) {
        console.log(id)
        return axios.put(API_UPDATE_URL + "/" + id, thongTin)
    }
}

export default new thongtinservice();