package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.HoaDon;
import com.example.datn404shoes.repository.HoaDonRepository;
import com.example.datn404shoes.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class HoaDonImpl implements HoaDonService {
    @Autowired
    HoaDonRepository hoaDonRepository;

    @Override
    public HoaDon add(HoaDon sp) {
        sp.setNgayTao(Date.valueOf(LocalDate.now()));
        sp.setNgayCapNhat(Date.valueOf(LocalDate.now()));
        hoaDonRepository.save(sp);
        return sp;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void update(HoaDon hoaDon) {
        HoaDon hoaDon1 = hoaDonRepository.findById(hoaDon.getId()).get();
        hoaDon1.setThanhToan(hoaDon.getThanhToan());
        hoaDon1.setTaiKhoan(hoaDon.getTaiKhoan());
        hoaDon1.setGhiChu(hoaDon.getGhiChu());
        hoaDon1.setNgayCapNhat(Date.valueOf(LocalDate.now()));
        hoaDonRepository.save(hoaDon1);
    }

    @Override
    public List<HoaDon> getAll() {
        return hoaDonRepository.findAll();
    }

    @Override
    public HoaDon getOne(Long id) {
        return hoaDonRepository.findById(id).get();
    }

    @Override
    public void chuyenTrangThai(HoaDonService hoaDon) {

    }
}
