package com.example.datn404shoes.controller;

import com.example.datn404shoes.custom.ThongKeCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.sql.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ThongKeController {


    @Autowired
    EntityManager entityManager;

    @GetMapping("/thong-ke")
    public List<ThongKeCustom> thongKeDoanhThu(
            @RequestParam("startDate") Date startDate,
            @RequestParam("endDate") Date endDate
    ) {
        String sql = "SELECT hd.ngay_tao AS ngaythang, sp.ten AS ten_san_pham, SUM(hct.so_luong * sp.gia_ban) AS doanh_thu " +
                "FROM hoa_don hd " +
                "JOIN hoa_don_chi_tiet hct ON hd.id = hct.hoa_don_id " +
                "JOIN san_pham_chi_tiet spct ON hct.san_pham_chi_tiet_id = spct.id " +
                "JOIN san_pham sp ON spct.san_pham_id = sp.id " +
                "WHERE hd.ngay_tao BETWEEN :startDate AND :endDate " +
                "GROUP BY hd.ngay_tao, sp.ten " +
                "ORDER BY ngaythang";

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("startDate", startDate);
        query.setParameter("endDate", endDate);

        List<ThongKeCustom> results = query.getResultList();

        return results;
    }

}
