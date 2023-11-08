package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.DanhMuc;
import com.example.datn404shoes.repository.DanhMucRepository;
import com.example.datn404shoes.service.DanhMucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DanhMucServiceimpl implements DanhMucService {
    @Autowired
    DanhMucRepository repository;

    @Override
    public boolean isDanhMucNameUnique(String name) {
        // Kiểm tra xem tên danh mục đã tồn tại trong cơ sở dữ liệu chưa
//        DanhMuc existingDanhMuc = repository.findByTen(name);
        return repository.existsDanhMucByTen(name);
    }

    @Override
    public DanhMuc add(DanhMuc danhMuc) {
        repository.save(danhMuc);
        return danhMuc;
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public DanhMuc update(Long id, DanhMuc danhMuc) {
        DanhMuc danhMuc1 = repository.findById(id).get();
        danhMuc1.setTen(danhMuc.getTen());
        danhMuc1.setTrangThai(danhMuc.getTrangThai());
        repository.save(danhMuc1);
        return danhMuc1;
    }

    @Override
    public DanhMuc thayDoiTrangThai(Long id, DanhMuc danhMuc) {
        DanhMuc danhMuc1 = repository.findById(id).get();
        danhMuc1.setTen(danhMuc.getTen());
        danhMuc1.setTrangThai(danhMuc.getTrangThai());
        return repository.save(danhMuc1);
    }

    @Override
    public Page<DanhMuc> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public DanhMuc getOne(Long id) {
        return repository.findById(id).get();
    }
}
