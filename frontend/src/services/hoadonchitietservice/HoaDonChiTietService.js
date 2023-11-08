import axios from 'axios';
const HOADON_API_BASE_URL_DETAIL = "http://localhost:8080/hoa_don_chi_tiet/hien-thi";

class HoaDonService{
   detailHDCT(HDID){
    return axios.get(HOADON_API_BASE_URL_DETAIL+"/"+HDID)
   }
   

}
export default new HoaDonService()