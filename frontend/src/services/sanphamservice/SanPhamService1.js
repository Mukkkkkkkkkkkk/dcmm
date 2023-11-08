import axios from "axios";

const BASE_URL_INDEX='http://localhost:8080/san_pham/index';
const BASE_URL_ADD='http://localhost:8080/san_pham/add';
const BASE_URL_DELETE='http://localhost:8080/san_pham/delete';
const BASE_URL_DETAIL='http://localhost:8080/san_pham/detail';
const BASE_URL_UPDATE='http://localhost:8080/san_pham/update';

class SanPhamService1{
    getSanPham(){
        return axios.get(BASE_URL_INDEX);
    }

    addSanPham(sanPham){
        return axios.post(BASE_URL_ADD,sanPham);
    }

    getSanPhamById(id){
        return axios.get(BASE_URL_DETAIL+"/"+id);
    }

    deleteSanPham(id){
        return axios.delete(BASE_URL_DELETE+"/"+id);
    }

    updateSanPham(id,sanPham){
        return axios.put(BASE_URL_UPDATE+"/"+id,sanPham);
    }
}
export default new SanPhamService1()