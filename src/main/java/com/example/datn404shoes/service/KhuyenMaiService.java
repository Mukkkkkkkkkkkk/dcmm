package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.KhuyenMai;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


public interface KhuyenMaiService {
    Page<KhuyenMai> getAll(Pageable pageable);
    KhuyenMai add(KhuyenMai khuyenMai);

    void delete(Long id);

    KhuyenMai update(Long id,KhuyenMai km);

    Optional<KhuyenMai>detail(Long id);

    KhuyenMai findOne(Long id);

    Page<KhuyenMai>findAll(Pageable pageable);
    void imPortExcel(MultipartFile file);
    boolean isKhuyenMaiNameUnique(String name);
}
