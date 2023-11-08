package com.example.datn404shoes.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestViewControler {

    @GetMapping("/tong_quan")
    public String tongQuan(Model model) {

        model.addAttribute("view", "/tong_quan/admin.jsp");
        return "admin/index";
    }

    @GetMapping("/san_pham")
    public String danhSachSanPham(Model model) {

        model.addAttribute("view", "/san_pham/danh_sach.jsp");
        return "admin/index";
    }

    @GetMapping("/danh_muc")
    public String danhMuc(Model model) {

        model.addAttribute("view", "/danh_muc/danh_sach.jsp");
        return "admin/index";
    }

    @GetMapping("/xem_sua_san_pham")
    public String xemSP(Model model) {

        model.addAttribute("view", "/san_pham/xem_sua_san_pham.jsp");
        return "admin/index";
    }

    @GetMapping("/hoa_don")
    public String hd(Model model) {

        model.addAttribute("view", "/hoa_don/danh_sach.jsp");
        return "admin/index";
    }

    @GetMapping("/xem_sua_hoa_don")
    public String xshd(Model model) {

        model.addAttribute("view", "/hoa_don/xem_sua_hoa_don.jsp");
        return "admin/index";
    }   @GetMapping("/tai_khoan")
    public String sx(Model model) {

        model.addAttribute("view", "/tai_khoan/danh_sach.jsp");
        return "admin/index";
    }   @GetMapping("/khuyen_mai")
    public String xx(Model model) {

        model.addAttribute("view", "/khuyen_mai/danh_sach.jsp");
        return "admin/index";
    } @GetMapping("/profile")
    public String x(Model model) {

        model.addAttribute("view", "/tai_khoan/thong_tin_tai_khoan.jsp");
        return "khach_hang/index";
    }
}
