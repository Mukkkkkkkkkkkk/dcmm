package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.HoaDonKhuyenMai;
import com.example.datn404shoes.repository.HoaDonKhuyenMaiRepository;
import com.example.datn404shoes.service.HoaDonKhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HoaDonKhuyenMaiImpl implements HoaDonKhuyenMaiService {

    @Autowired
    HoaDonKhuyenMaiRepository hoaDonKhuyenMaiRepository;

    @Override
    public List<HoaDonKhuyenMai> getAll() {
        return hoaDonKhuyenMaiRepository.findAll();
    }

    @Override
    public void add(HoaDonKhuyenMai hoaDonKhuyenMai) {
        hoaDonKhuyenMaiRepository.save(hoaDonKhuyenMai);
    }

    @Override
    public void delete(Long id) {
        hoaDonKhuyenMaiRepository.deleteById(id);
    }

    @Override
    public void update(HoaDonKhuyenMai hoaDonKhuyenMai) {
        HoaDonKhuyenMai hoaDonKhuyenMai1 = hoaDonKhuyenMaiRepository.findById(hoaDonKhuyenMai.getId()).get();
        hoaDonKhuyenMai1.setHoaDon(hoaDonKhuyenMai.getHoaDon());
        hoaDonKhuyenMai1.setKhuyenMai(hoaDonKhuyenMai.getKhuyenMai());
        this.hoaDonKhuyenMaiRepository.save(hoaDonKhuyenMai1);

    }

    @Override
    public HoaDonKhuyenMai detail(Long id) {
        return hoaDonKhuyenMaiRepository.findById(id).get();
    }

    @Override
    public Optional<HoaDonKhuyenMai> detaill(Long id) {
        return hoaDonKhuyenMaiRepository.findById(id);
    }



    @Override
    public HoaDonKhuyenMai findOne(Long id) {
        return hoaDonKhuyenMaiRepository.findById(id).get();
    }
}
