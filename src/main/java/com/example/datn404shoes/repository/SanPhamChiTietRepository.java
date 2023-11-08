package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamChiTietRepository extends JpaRepository<SanPhamChiTiet,Long> {
    @Query(value = "select * from san_pham_chi_tiet spct where spct.san_pham_id = :id",nativeQuery = true)
    public List<SanPhamChiTiet> getAllSPCT(@Param("id") long íd);
}
