package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.MauSac;
import com.example.datn404shoes.entity.ThuongHieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ThuongHieuService {
    ThuongHieu add(ThuongHieu th);

    ThuongHieu thayDoiTrangThai(Long id, ThuongHieu thuongHieu);

    void delete(Long id);

    ThuongHieu update(Long id, ThuongHieu th);

    Page<ThuongHieu> getAll(Pageable pageable);

    ThuongHieu getOne(Long id);
    boolean isThuongHieuNameUnique(String name);

}
