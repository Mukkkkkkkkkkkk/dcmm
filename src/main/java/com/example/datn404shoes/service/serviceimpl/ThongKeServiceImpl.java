package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.custom.ThongKeCustom;
import com.example.datn404shoes.repository.ThongKeRepository;
import com.example.datn404shoes.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;


@Service
public class ThongKeServiceImpl implements ThongKeService {

    @Autowired
    ThongKeRepository thongKeRepository;

    @Override
    public List<ThongKeCustom> thongKeDoanhThuTheoNgay(Date ngayBatDau, Date ngayKetThuc) {
        return thongKeRepository.thongKeDoanhThuTheoNgay(ngayBatDau,ngayKetThuc);
    }
}
