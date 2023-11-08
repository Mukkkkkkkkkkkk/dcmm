package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SanPhamService {
    SanPham add(SanPham sp);

    void delete(Long id);

    SanPham update(Long id, SanPham sp);

    Page<SanPham> getAllPhanTrang(Pageable pageable);


    List<SanPham> getAll();

    SanPham getOne(Long id);

    void chuyenSoLuong(SanPham sp);

    void importExcel(MultipartFile file);
}
