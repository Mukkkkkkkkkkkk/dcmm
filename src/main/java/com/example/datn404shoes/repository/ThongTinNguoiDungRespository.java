package com.example.datn404shoes.repository;

//import com.poly.duanbangiay.entity.ThongTinNguoiDung;
import com.example.datn404shoes.entity.SanPhamChiTiet;
import com.example.datn404shoes.entity.ThongTinNguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThongTinNguoiDungRespository extends JpaRepository<ThongTinNguoiDung,Long> {

}
