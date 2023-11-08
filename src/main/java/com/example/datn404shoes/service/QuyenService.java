package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.MauSac;
import com.example.datn404shoes.entity.Quyen;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QuyenService {


    Page<Quyen> findAll(Pageable pageable);

    Quyen findOne(Long id);
}
