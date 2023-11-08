package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.KichThuoc;
import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.entity.ThuongHieu;
import com.example.datn404shoes.entity.XuatXu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface TaiKhoanService {
    TaiKhoan add(TaiKhoan taiKhoan);

    void delete(Long id);

    TaiKhoan update(Long id, TaiKhoan taiKhoan);

    List<TaiKhoan> getAll();

    TaiKhoan getOne(Long id);

    Page<TaiKhoan> findAll(Pageable pageable);

    TaiKhoan thayDoiTrangThai(Long id, TaiKhoan taiKhoan);

    List<TaiKhoan> getNhanVienByQuyenId1();

    List<TaiKhoan> getNhanVienByQuyenId2();

    List<TaiKhoan> getNhanVienByQuyenId3();

    List<TaiKhoan> getNhanVienByQuyenId4();

//    List<TaiKhoan> getAllTaiKhoan(Long id);

    TaiKhoan getOneBySDT(String sdt);
}
