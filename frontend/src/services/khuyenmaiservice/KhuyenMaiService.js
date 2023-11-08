import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/khuyen_mai/index";
const BASE_URL_DETAIL = "http://localhost:8080/khuyen_mai/detail";
 // const BASE_URL_ADD = "http://localhost:8080/khuyen_mai/add";
const API_DELETE_URL = "http://localhost:8080/khuyen_mai/delete";
const API_UPDATE_URL = "http://localhost:8080/khuyen_mai/update";
const API_SAVE_URL = "http://localhost:8080/khuyen_mai/add";

class KhuyenMaiService {

    getKhuyenMai(pageNumber){
        return axios.get(API_BASE_URL+`?page=${pageNumber}&size=5`);
    }
    createKhuyenMai(khuyenMai){
        return axios.post(API_SAVE_URL,khuyenMai)
    }

    getKhuyenMaiById(id){
        return axios.get(BASE_URL_DETAIL+"/"+id);
    }

    // addKhuyenMai(khuyenMai){
    //     return axios.post(BASE_URL_ADD,khuyenMai);
    // }

    deleteKhuyenMai(id){
        return axios.delete(API_DELETE_URL+"/"+id);
    }

    updateKhuyenMai(id,khuyenMai){
        console.log(id);
        return axios.put(API_UPDATE_URL+"/"+id,khuyenMai);
    }
    // updateKhuyenMai(khuyenMaiUpdate, id) {
    //     return axios.put(`http://localhost:8080/khuyen_mai/update/${id}`, khuyenMaiUpdate);
    // }


}
export  default new KhuyenMaiService();