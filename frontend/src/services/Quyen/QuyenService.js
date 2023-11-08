import axios from 'axios';
const API_BASE_URL = "http://localhost:8080/quyen/hien_thi";


class QuyenService {

    getQuyen(pageNumber) {
        return axios.get(API_BASE_URL+`?page=${pageNumber}&size=5`);
    }
}

export default new QuyenService();