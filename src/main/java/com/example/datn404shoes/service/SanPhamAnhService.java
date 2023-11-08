package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.entity.SanPhamAnh;
import com.example.datn404shoes.request.SanPhamCustom;

import java.util.List;

public interface SanPhamAnhService {
    List<SanPhamCustom> getAllSPCoAnh();
    List<SanPhamAnh> getAllAnh(long id);
    void save(SanPhamAnh spa);
    void delete(Long id);
    List<SanPhamAnh> getAll();
    SanPhamAnh getOne(Long id);
}
