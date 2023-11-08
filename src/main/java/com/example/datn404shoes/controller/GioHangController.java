package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.GioHang;
import com.example.datn404shoes.service.GioHangChiTietService;
import com.example.datn404shoes.service.GiohangService;
import com.example.datn404shoes.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/gio-hang")
public class GioHangController {

    private final GiohangService giohangService;

    private final GioHangChiTietService gioHangChiTietService;

    private final TaiKhoanService taiKhoanService;

    @Autowired
    public GioHangController(GiohangService giohangService, GioHangChiTietService gioHangChiTietService, TaiKhoanService taiKhoanService){
        this.gioHangChiTietService = gioHangChiTietService;
        this.giohangService = giohangService;
        this.taiKhoanService = taiKhoanService;
    }

    @GetMapping("/danh-sach")
    public ResponseEntity<?> danhSach() {
        return ResponseEntity.ok(giohangService.getAll());
    }

    @PostMapping("/add")
    public String themGioHang(Model model) {


        return "redirect:/giohang/index";
    }

    @GetMapping("/delete/{id}")
    public String xoaGioHang(Model model,
                             @PathVariable("id") Long id) {

        return "redirect:/giohang/index";
    }
}
