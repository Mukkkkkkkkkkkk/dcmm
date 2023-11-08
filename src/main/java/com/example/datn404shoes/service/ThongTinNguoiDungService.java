package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.PhanQuyen;
import com.example.datn404shoes.entity.ThongTinNguoiDung;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface ThongTinNguoiDungService {
    List<ThongTinNguoiDung> getAll();

    Page<ThongTinNguoiDung> getAllPhanTrang(Pageable pageable);
    ThongTinNguoiDung add(ThongTinNguoiDung thongTinNguoiDung);

    void delete(Long id);
    ThongTinNguoiDung getOne(Long id);
    ThongTinNguoiDung update(Long id, ThongTinNguoiDung thongTinNguoiDung);
}
