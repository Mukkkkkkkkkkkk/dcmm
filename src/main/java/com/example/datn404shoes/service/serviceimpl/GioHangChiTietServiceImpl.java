package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.GioHangChiTiet;
import com.example.datn404shoes.repository.GioHangChiTietRepository;
import com.example.datn404shoes.service.GioHangChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GioHangChiTietServiceImpl implements GioHangChiTietService {

    @Autowired
    private GioHangChiTietRepository giohangchitietRepository;

    @Override
    public void add(GioHangChiTiet ghct) {
        giohangchitietRepository.save(ghct);
    }

    @Override
    public void delete(Long id) {
        giohangchitietRepository.deleteById(id);
    }

    @Override
    public void update(GioHangChiTiet ghct) {
        GioHangChiTiet giohangCT = giohangchitietRepository.findById(ghct.getId()).get();
        giohangCT.setSoLuong(ghct.getSoLuong());
        giohangCT.setSanPhamChiTietId(ghct.getSanPhamChiTietId());
        giohangCT.setGioHangId(ghct.getGioHangId());
        this.giohangchitietRepository.save(giohangCT);
    }

    @Override
    public List<GioHangChiTiet> getAll() {
        return giohangchitietRepository.findAll();
    }

    @Override
    public GioHangChiTiet getOne(Long id) {
        return giohangchitietRepository.findById(id).get();
    }
}
