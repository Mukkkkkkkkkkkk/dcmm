import axios from 'axios';
const API_BASE_URL = "http://localhost:8080/tai_khoan/index";
const API_BASE_URL_THONG_TIN = "http://localhost:8080/thong_tin/index";
const API_BASE_URL_NHAN_VIEN = "http://localhost:8080/tai_khoan/nhan-vien-quyen-1";
const API_BASE_URL_QUAN_LY = "http://localhost:8080/tai_khoan/nhan-vien-quyen-2";
const API_BASE_URL_KHACH_HANG = "http://localhost:8080/tai_khoan/nhan-vien-quyen-3";
const API_API_BASE_URL_SAVE = "http://localhost:8080/tai_khoan/add";
const API_API_BASE_URL_SAVE_QUAN_LY = "http://localhost:8080/tai_khoan/addQuanLy";
const API_API_BASE_URL_SAVE_NHAN_VIEN = "http://localhost:8080/tai_khoan/addNhanVien";
const API_API_BASE_URL_SAVE_KHACH_HANG = "http://localhost:8080/tai_khoan/addKhachHang";
const API_BASE_URL_DELETE = "http://localhost:8080/tai_khoan/delete";
const API_BASE_URL_UPDATE = "http://localhost:8080/tai_khoan/update";
const API_BASE_URL_UPDATE_QUAN_LY = "http://localhost:8080/tai_khoan/updateQuanLy";
const API_BASE_URL_UPDATE_NHAN_VIEN = "http://localhost:8080/tai_khoan/updateNhanVien";
const API_BASE_URL_UPDATE_KHACH_HANG = "http://localhost:8080/tai_khoan/updateKhacHang";
const TAIKHOAN_API_UPDATEtt_URL = "http://localhost:8080/tai_khoan/updatett";
class taikhoanservice {


    getTaiKhoan(pageNumber) {
        return axios.get(API_BASE_URL+`?page=${pageNumber}&size=5`);
    }
    // getThongTin(pageNumber) {
    //     return axios.get(API_BASE_URL_THONG_TIN+`?page=${pageNumber}&size=5`);
    // }
    addTaiKhoan(taiKhoan) {
        return axios.post(API_API_BASE_URL_SAVE, taiKhoan)
    }
    addQuanLy(data) {
        console.log(data)
        return axios.post(API_API_BASE_URL_SAVE_QUAN_LY, data);
    }
    addNhanVien(data) {
        return axios.post(API_API_BASE_URL_SAVE_NHAN_VIEN, data)
    }
    addKhachHang(data) {
        return axios.post(API_API_BASE_URL_SAVE_KHACH_HANG, data)
    }
    deleteTaiKhoan(id) {
        return axios.delete(API_BASE_URL_DELETE + '/' + id)
    }

    getTaiKhoanById(id) {
        return axios.get(API_BASE_URL + "/" + id);
    }
    getQuanLyById(id) {
        return axios.get(API_BASE_URL_QUAN_LY + "/" + id);
    }
    getNhanVienById(id) {
        return axios.get(API_BASE_URL_NHAN_VIEN + "/" + id);
    }
    getKhachHangById(id) {
        return axios.get(API_BASE_URL_KHACH_HANG + "/" + id);
    }
    getThongTinByTaiKhoan(taiKhoan) {
        if (taiKhoan && taiKhoan.thongTinNguoiDung && taiKhoan.thongTinNguoiDung.id) {
            return axios.get(API_BASE_URL_THONG_TIN + "/" + taiKhoan.thongTinNguoiDung.id);
        } else {
            return Promise.reject("Thông tin tài khoản không hợp lệ.");
        }
    }

    getNhanVien(pageNumber) {
        return axios.get(API_BASE_URL_NHAN_VIEN+`?page=${pageNumber}&size=5`);
    }
    getKhachHang(pageNumber) {
        return axios.get(API_BASE_URL_KHACH_HANG+`?page=${pageNumber}&size=5`);
    }
    getQuanLy(pageNumber) {
        return axios.get(API_BASE_URL_QUAN_LY+`?page=${pageNumber}&size=5`);
    }
    updateQuanLy(taiKhoan,id) {
        console.log(id)
        return axios.put(API_BASE_URL_UPDATE_QUAN_LY + "/" + id,taiKhoan)
    }
    updateNhanVien(taiKhoan,id) {
        console.log(id)
        return axios.put(API_BASE_URL_UPDATE_NHAN_VIEN + "/" + id,taiKhoan)
    }
    updateKhachHang(taiKhoan,id) {
        console.log(id)
        return axios.put(API_BASE_URL_UPDATE_KHACH_HANG + "/" + id,taiKhoan)
    }
    updateTaiKhoan(taiKhoan,id) {
        console.log(id)
        return axios.put(API_BASE_URL_UPDATE + "/" + id,taiKhoan)
    }
    updateTaiKhoanTrangThai(trangThai, id) {
        return axios.put(TAIKHOAN_API_UPDATEtt_URL + "/" + id, trangThai); // Truyền trạng thái thay vì thuongHieu
    }
}

export default new taikhoanservice();