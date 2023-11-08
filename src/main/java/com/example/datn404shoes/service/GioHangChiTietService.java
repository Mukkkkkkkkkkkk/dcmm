package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.GioHangChiTiet;
//import com.poly.duanbangiay.entity.GioHangChiTiet;

import java.util.List;

public interface GioHangChiTietService {
    void add(GioHangChiTiet ghct);

    void delete(Long id);

    void update(GioHangChiTiet ghct);

    List<GioHangChiTiet> getAll();

    GioHangChiTiet getOne(Long id);
}
