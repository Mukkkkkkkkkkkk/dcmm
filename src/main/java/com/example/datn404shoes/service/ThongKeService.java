package com.example.datn404shoes.service;

import com.example.datn404shoes.custom.ThongKeCustom;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public interface ThongKeService {
    List<ThongKeCustom> thongKeDoanhThuTheoNgay(Date ngayBatDau, Date ngayKetThuc);
}
