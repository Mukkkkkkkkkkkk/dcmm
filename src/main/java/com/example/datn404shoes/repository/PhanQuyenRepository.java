package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.PhanQuyen;
//import com.poly.duanbangiay.entity.PhanQuyen;
import com.example.datn404shoes.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhanQuyenRepository extends JpaRepository<PhanQuyen,Long> {
   List<PhanQuyen> findPhanQuyenByQuyenId(Long idQuyen);
}
