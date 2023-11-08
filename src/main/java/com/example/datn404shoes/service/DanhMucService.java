package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.DanhMuc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DanhMucService {
    DanhMuc add(DanhMuc danhMuc);

    void delete(Long id);

    DanhMuc update(Long id, DanhMuc danhMuc);

    DanhMuc thayDoiTrangThai(Long id, DanhMuc danhMuc);

    Page<DanhMuc> getAll(Pageable pageable);

    DanhMuc getOne(Long id);

    boolean isDanhMucNameUnique(String name);
}
