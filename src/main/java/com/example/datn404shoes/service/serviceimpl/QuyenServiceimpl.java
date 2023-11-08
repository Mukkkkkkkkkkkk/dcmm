package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.Quyen;
import com.example.datn404shoes.repository.QuyenResponsitory;
import com.example.datn404shoes.service.QuyenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class QuyenServiceimpl implements QuyenService {
    @Autowired
    QuyenResponsitory responsitory;


    @Override
    public Page<Quyen> findAll(Pageable pageable) {
        return responsitory.findAll(pageable);
    }

    @Override
    public Quyen findOne(Long id) {
        return responsitory.findById(id).get();
    }
}
