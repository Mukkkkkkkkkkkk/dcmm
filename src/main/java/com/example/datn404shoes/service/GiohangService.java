package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.GioHang;

import java.util.List;

public interface GiohangService {

    void add(GioHang giohang);

    void delete(Long id);

    void update(GioHang gioHang);

    List<GioHang> getAll();

    GioHang getOne(Long id);
}
