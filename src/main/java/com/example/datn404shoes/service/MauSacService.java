package com.example.datn404shoes.service;


import com.example.datn404shoes.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface MauSacService {
    MauSac add(MauSac mauSac);

    void delete(Long id);

    MauSac thayDoiTrangThai(Long id, MauSac mauSac);

    MauSac update(Long idud, MauSac mauSac);

    MauSac detail(Long id);

    MauSac findOne(Long id);

    Page<MauSac> findAll(Pageable pageable);

    void imPortExcel(MultipartFile file);
    boolean isMauSacNameUnique(String name);

}
