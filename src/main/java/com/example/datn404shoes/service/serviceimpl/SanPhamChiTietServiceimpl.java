package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.KichThuoc;
import com.example.datn404shoes.entity.MauSac;
import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.entity.SanPhamChiTiet;
import com.example.datn404shoes.repository.SanPhamChiTietRepository;
import com.example.datn404shoes.request.SanPhamChiTietRequest;
import com.example.datn404shoes.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
@Service
public class SanPhamChiTietServiceimpl implements SanPhamChiTietService {
    @Autowired
    SanPhamChiTietRepository repo;
    @Override
    public SanPhamChiTiet getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public List<SanPhamChiTiet> getAll() {
        return repo.findAll();
    }

    @Override
    public Page<SanPhamChiTiet> getAllPhanTrang(Pageable pageable) {
        return repo.findAll(pageable);
    }

    @Override
    public SanPhamChiTiet add(SanPhamChiTietRequest spct1) {
        SanPhamChiTiet spct = new SanPhamChiTiet();
        spct.setNgayTao(Date.valueOf(LocalDate.now()));
        spct.setNgayCapNhat(Date.valueOf(LocalDate.now()));
        spct.setSoLuong(spct1.getSoLuong());
        spct.setTrangThai(spct1.getTrangThai());
        return repo.save(spct);
    }

    @Override
    public void delete(Long id) {
        SanPhamChiTiet a = repo.findById(id).orElse(null);
        if(a.getTrangThai()==0){
            a.setTrangThai(1);
        }else{
            a.setTrangThai(0);
        }
        repo.save(a);
    }

    @Override
    public SanPhamChiTiet update(Long id, SanPhamChiTietRequest spct) {
        SanPhamChiTiet a = repo.findById(id).orElse(null);
        a.setTrangThai(spct.getTrangThai());
        a.setNgayCapNhat(Date.valueOf(LocalDate.now()));
        a.setKichThuoc(KichThuoc.builder().id(spct.getKichThuoc()).build());
        a.setMauSac(MauSac.builder().id(spct.getMauSac()).build());
        a.setSanPham(SanPham.builder().id(spct.getSanPham()).build());
        a.setSoLuong(spct.getSoLuong());
        repo.save(a);
        return a;
    }
}
