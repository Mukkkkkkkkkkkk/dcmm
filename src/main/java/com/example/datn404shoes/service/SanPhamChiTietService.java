package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.SanPhamChiTiet;
import com.example.datn404shoes.request.SanPhamChiTietRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SanPhamChiTietService {
    SanPhamChiTiet getOne(Long id);

    List<SanPhamChiTiet> getAll();

    Page<SanPhamChiTiet> getAllPhanTrang(Pageable pageable);

    SanPhamChiTiet add(SanPhamChiTietRequest spct);

    void delete(Long id);

    SanPhamChiTiet update(Long id, SanPhamChiTietRequest spct);
}
