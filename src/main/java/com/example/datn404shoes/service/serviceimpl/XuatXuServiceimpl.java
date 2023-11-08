package com.example.datn404shoes.service.serviceimpl;


import com.example.datn404shoes.entity.XuatXu;
import com.example.datn404shoes.entity.XuatXu;
import com.example.datn404shoes.repository.XuatXuRepository;
import com.example.datn404shoes.service.XuatXuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class XuatXuServiceimpl implements XuatXuService {
    @Autowired
    XuatXuRepository repository;

    @Override
    public XuatXu add(XuatXu xuatXu) {
        return repository.save(xuatXu);
    }

    @Override
    public XuatXu thayDoiTrangThai(Long id, XuatXu xuatXu) {
        XuatXu xuatXu1 = repository.findById(id).get();
        xuatXu1.setTen(xuatXu.getTen());
        xuatXu1.setTrangThai(xuatXu.getTrangThai());
        return repository.save(xuatXu1);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public XuatXu update(Long id, XuatXu xuatXu) {
        XuatXu xuatXu1 = getOne(id);
        xuatXu1.setTen(xuatXu.getTen());
        xuatXu1.setTrangThai(xuatXu.getTrangThai());
        repository.save(xuatXu1);
        return xuatXu1;
    }

    @Override
    public Page<XuatXu> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public XuatXu getOne(Long id) {
        return repository.findById(id).get();
    }

    @Override
    public boolean isXuatXuNameUnique(String name) {
        return repository.existsXuatXuByTen(name);
    }
}
