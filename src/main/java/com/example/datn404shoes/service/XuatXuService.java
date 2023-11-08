package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.MauSac;
import com.example.datn404shoes.entity.XuatXu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface XuatXuService {
    XuatXu add(XuatXu xuatXu);

    XuatXu thayDoiTrangThai(Long id, XuatXu xuatXu);


    void delete(Long id);

    XuatXu update(Long id, XuatXu xuatXu);

    Page<XuatXu> getAll(Pageable pageable);

    XuatXu getOne(Long id);
    boolean isXuatXuNameUnique(String name);

}
