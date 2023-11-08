package com.example.datn404shoes.service.serviceimpl;


import com.example.datn404shoes.entity.ThongTinNguoiDung;
import com.example.datn404shoes.repository.ThongTinNguoiDungRespository;
import com.example.datn404shoes.service.ThongTinNguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ThongTinNguoiDungServiceimpl implements ThongTinNguoiDungService {
 @Autowired
 private ThongTinNguoiDungRespository respository;
    @Override
    public List<ThongTinNguoiDung> getAll() {
        return respository.findAll();
    }

    @Override
    public Page<ThongTinNguoiDung> getAllPhanTrang(Pageable pageable) {
        return respository.findAll(pageable);
    }

    @Override
    public ThongTinNguoiDung add(ThongTinNguoiDung thongTin) {
        thongTin.setNgayCapNhat(Date.valueOf(LocalDate.now()));
        return respository.saveAndFlush(thongTin);
    }

    @Override
    public void delete(Long id) {
           respository.deleteById(id);
    }

    @Override
    public ThongTinNguoiDung getOne(Long id) {
        return respository.findById(id).get();
    }

    @Override
    public ThongTinNguoiDung update(Long id, ThongTinNguoiDung thongTinNguoiDung) {
        ThongTinNguoiDung a = getOne(id);
        a.setTen(thongTinNguoiDung.getTen());
        a.setSdt(thongTinNguoiDung.getSdt());
//        a.setCCCD(thongTinNguoiDung.getCCCD());
        a.setGioiTinh(thongTinNguoiDung.getGioiTinh());
        a.setNgaySinh(thongTinNguoiDung.getNgaySinh());
        a.setNgayCapNhat(thongTinNguoiDung.getNgayCapNhat());
        respository.save(a);
        return a;
    }
}
