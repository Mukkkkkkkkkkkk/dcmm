package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.HoaDonChiTiet;
import com.example.datn404shoes.service.serviceimpl.HoaDonChiTietimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("hoa_don_chi_tiet")
public class HoaDonChiTietController {
    @Autowired
    HoaDonChiTietimpl hoaDonChiTietimpl;
    @GetMapping("hien-thi/{idHD}")
    public ResponseEntity<?> hienthi(@PathVariable("idHD") Long idHD){
        List<HoaDonChiTiet> listHDCT = hoaDonChiTietimpl.getAllByIdHD(idHD);
        return ResponseEntity.ok(listHDCT);
    }
//    @GetMapping("hien-thi-one/{idHD}")
//    public ResponseEntity<?> hienthiOne(@PathVariable("idHD") Long idHD){
//        HoaDonChiTiet hoaDonChiTiet = hoaDonChiTietimpl.getOne(idHD);
//        return ResponseEntity.ok(hoaDonChiTiet);
//    }
}
