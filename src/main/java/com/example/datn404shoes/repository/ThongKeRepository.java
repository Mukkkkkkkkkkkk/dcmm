package com.example.datn404shoes.repository;

import com.example.datn404shoes.custom.ThongKeCustom;
import com.example.datn404shoes.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface ThongKeRepository extends JpaRepository<HoaDon, Long> {

    @Query("SELECT NEW com.example.datn404shoes.custom.ThongKeCustom(CAST(h.ngayTao AS DATE), SUM(h.tongTienSauGiam)) " +
            "FROM HoaDon h " +
            "WHERE h.ngayTao BETWEEN :startDate AND :endDate " +
            "GROUP BY CAST(h.ngayTao AS DATE)")
    List<ThongKeCustom> thongKeDoanhThuTheoNgay(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
