package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.entity.SanPhamAnh;
import com.example.datn404shoes.repository.SanPhamAnhRespository;
import com.example.datn404shoes.request.SanPhamCustom;
import com.example.datn404shoes.service.SanPhamAnhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamAnhServiceimpl implements SanPhamAnhService {
    @Autowired
    SanPhamAnhRespository respository;

    @Override
    public List<SanPhamCustom> getAllSPCoAnh() {
        return respository.getSPCoAnh();
    }

    @Override
    public List<SanPhamAnh> getAllAnh(long id) {
        return respository.getAllAnh(id);
    }

    @Override
    public void save(SanPhamAnh spa) {
        respository.saveAndFlush(spa);
    }

    @Override
    public void delete(Long id) {
        respository.deleteById(id);
    }

    @Override
    public List<SanPhamAnh> getAll() {
        return respository.findAll();
    }

    @Override
    public SanPhamAnh getOne(Long id) {
        return respository.findById(id).get();
    }
}
