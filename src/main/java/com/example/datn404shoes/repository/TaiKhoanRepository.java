package com.example.datn404shoes.repository;

//import com.poly.duanbangiay.entity.TaiKhoan;
import com.example.datn404shoes.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Long> {
    TaiKhoan findByThongTinNguoiDung_Sdt(String sdt);
}
