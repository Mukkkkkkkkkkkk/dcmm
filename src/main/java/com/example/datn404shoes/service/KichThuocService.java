package com.example.datn404shoes.service;


import com.example.datn404shoes.entity.DanhMuc;
import com.example.datn404shoes.entity.KichThuoc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
public interface KichThuocService {
    KichThuoc add(KichThuoc kichThuoc);

    KichThuoc thayDoiTrangThai(Long id, KichThuoc kichThuoc);

    void delete(Long id);

    KichThuoc update(KichThuoc kichThuoc, Long idKichThuoc);

    KichThuoc detail(Long id);

    KichThuoc findOne(Long id);

    Page<KichThuoc> findAll(Pageable pageable);

    void imPortExcel(MultipartFile file);

    boolean isKichThuocNameUnique(Integer name);

}
