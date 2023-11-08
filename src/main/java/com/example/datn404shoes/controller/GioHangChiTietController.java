package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.GioHangChiTiet;
import com.example.datn404shoes.service.GioHangChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("gio-hang-chi-tiet")
public class GioHangChiTietController {

    private final GioHangChiTietService gioHangChiTietService;

    @Autowired
    public GioHangChiTietController(GioHangChiTietService gioHangChiTietService){
        this.gioHangChiTietService = gioHangChiTietService;
    }

    @GetMapping("/danh-sach")
    public ResponseEntity<?> danhSach(){
        return ResponseEntity.ok(gioHangChiTietService.getAll());
    }
}
