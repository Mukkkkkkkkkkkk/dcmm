package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.HoaDon;

import java.util.List;

public interface HoaDonService {
    HoaDon add(HoaDon sp);
    void delete(Long id);
    void update(HoaDon hoaDon);
    List<HoaDon> getAll();
    HoaDon getOne(Long id);
    void chuyenTrangThai(HoaDonService hoaDon);
}
