package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.HoaDonChiTiet;
//import com.poly.duanbangiay.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet,Long> {
    List<HoaDonChiTiet> findAllByHd_Id(Long id);

}
