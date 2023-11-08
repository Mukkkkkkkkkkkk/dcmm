package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.GioHang;
import com.example.datn404shoes.repository.GioHangRepository;
import com.example.datn404shoes.service.GiohangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GioHangServiceImpl implements GiohangService {

    @Autowired
    private GioHangRepository giohangRepository;

    @Override
    public void add(GioHang giohang) {
        giohangRepository.save(giohang);
    }

    @Override
    public void delete(Long id) {
        giohangRepository.deleteById(id);
    }

    @Override
    public void update(GioHang gioHang) {
        GioHang giohang = giohangRepository.findById(gioHang.getId()).get();
        giohang.setTrangThai(gioHang.getTrangThai());
        giohang.setGhiChu(gioHang.getGhiChu());
        giohang.setNgayTao(gioHang.getNgayTao());
        giohang.setTaiKhoan(gioHang.getTaiKhoan());
        this.giohangRepository.save(gioHang);
    }

    @Override
    public List<GioHang> getAll() {
        return giohangRepository.findAll();
    }

    @Override
    public GioHang getOne(Long id) {
        return giohangRepository.findById(id).get();
    }

}
