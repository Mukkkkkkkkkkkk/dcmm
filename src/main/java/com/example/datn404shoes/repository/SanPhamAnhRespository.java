package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.entity.SanPhamAnh;
//import com.poly.duanbangiay.entity.SanPhamAnh;
import com.example.datn404shoes.request.SanPhamCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamAnhRespository extends JpaRepository<SanPhamAnh,Long> {
    @Query(value = "Select sp.id , sp.ten from san_pham sp join san_pham_anh spa on spa.san_pham_id = sp.id group by sp.id, sp.ten",nativeQuery = true)
    public List<SanPhamCustom> getSPCoAnh();

    @Query(value = "select * from san_pham_anh spa where spa.san_pham_id = :id",nativeQuery = true)
    public List<SanPhamAnh> getAllAnh(@Param("id") long íd);
}
