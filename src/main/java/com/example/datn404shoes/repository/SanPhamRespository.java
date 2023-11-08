package com.example.datn404shoes.repository;

//import com.poly.duanbangiay.entity.SanPham;
import com.example.datn404shoes.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamRespository extends JpaRepository<SanPham,Long> {
}
