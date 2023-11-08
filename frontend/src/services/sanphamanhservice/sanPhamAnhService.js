import axios from "axios";
const API_BASE_URL = "http://localhost:8080/san_pham_anh/index";
const API_SAVE_URL = "http://localhost:8080/san_pham_anh/add";
const API_DELETE_URL = "http://localhost:8080/san_pham_anh/delete";
const API_DETAIL_URL = "http://localhost:8080/san_pham_anh/detail";

class SanPhamAnhService {
    getAllSPCoAnh(){
        return axios.get(API_BASE_URL);
    }
    getDetail(id){
        return axios.get(API_DETAIL_URL+"/"+id);
    }
}
export default new SanPhamAnhService();