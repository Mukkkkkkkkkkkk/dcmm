package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.GioHangChiTiet;
import com.example.datn404shoes.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GioHangChiTietRepository extends JpaRepository<GioHangChiTiet,Long> {

    @Query(value = "SELECT sp FROM SanPham sp INNER JOIN GioHangChiTiet ghct WHERE ghct.id =:id")
            public List<SanPham> getSanPham(@Param("id") Long id);
}
