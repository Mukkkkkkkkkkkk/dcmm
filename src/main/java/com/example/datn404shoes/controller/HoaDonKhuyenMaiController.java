package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.*;
import com.example.datn404shoes.service.serviceimpl.HoaDonImpl;
import com.example.datn404shoes.service.serviceimpl.HoaDonKhuyenMaiImpl;
import com.example.datn404shoes.service.serviceimpl.KhuyenMaiServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/hoa_don_khuyen_mai")
public class HoaDonKhuyenMaiController {
    @Autowired
    private HoaDonKhuyenMaiImpl hoaDonKhuyenMaiServiceimpl;
    @Autowired
    KhuyenMaiServiceImpl khuyenMaiServiceimpl;
    @Autowired
    HoaDonImpl hoaDonServiceimpl;
    @GetMapping("/index")
    public String hienThi(Model model){
        List<HoaDonKhuyenMai> list = hoaDonKhuyenMaiServiceimpl.getAll();
//        List<KhuyenMai>listKhuyenMai = khuyenMaiServiceimpl.getAll();
        model.addAttribute("listHDKM",list);
         model.addAttribute("listHD",hoaDonServiceimpl.getAll());
//        model.addAttribute("listKM",listKhuyenMai);
        model.addAttribute("view", "/hoa_don_khuyen_mai/index.jsp");
        return "admin/index";

    }
    @GetMapping("/create")
    public String create(Model model){
//        List<KhuyenMai>listKhuyenMai = khuyenMaiServiceimpl.getAll();
        model.addAttribute("listHD",hoaDonServiceimpl.getAll());
//        model.addAttribute("listKM",listKhuyenMai);
        model.addAttribute("view", "/hoa_don_khuyen_mai/add.jsp");
        return "admin/index";
    }
    @GetMapping("/xoa/{id}")
    public String xoa(Model model,
                      @PathVariable("id")Long id){
        hoaDonKhuyenMaiServiceimpl.delete(id);
        return "redirect:/hoa_don_khuyen_mai/index";
    }
    @PostMapping("/add")
    public String add(Model model,
                      @RequestParam("hoaDon")HoaDon hoaDon,
                      @RequestParam("khuyenMai")KhuyenMai khuyenMai){
       HoaDonKhuyenMai hdkm= new HoaDonKhuyenMai();
      hdkm.setHoaDon(hoaDon);
      hdkm.setKhuyenMai(khuyenMai);
       hoaDonKhuyenMaiServiceimpl.add(hdkm);
        return "redirect:/hoa_don_khuyen_mai/index";

    }
    @GetMapping("/detail/{id}")
    public String detail(Model model,
                         @PathVariable("id")Long id){
        Optional<HoaDonKhuyenMai> hdkm = hoaDonKhuyenMaiServiceimpl.detaill(id);
        List<HoaDonKhuyenMai> list = hoaDonKhuyenMaiServiceimpl.getAll();
//        List<KhuyenMai>listKhuyenMai = khuyenMaiServiceimpl.getAll();
        model.addAttribute("listHDKM",list);
        model.addAttribute("listHD",hoaDonServiceimpl.getAll());
//        model.addAttribute("listKM",listKhuyenMai);
        model.addAttribute("hdkm",hdkm.get());
        model.addAttribute("view","/hoa_don_khuyen_mai/index.jsp");
        return "admin/index";

    }
    @PostMapping("/update/{id}")
    public String update(Model model,
                      @PathVariable("id")Long id,
                      @RequestParam("hoaDon")HoaDon hoaDon,
                      @RequestParam("khuyenMai")KhuyenMai khuyenMai){
        HoaDonKhuyenMai hdkm= new HoaDonKhuyenMai();
        hdkm.setId(id);
        hdkm.setHoaDon(hoaDon);
        hdkm.setKhuyenMai(khuyenMai);
        hoaDonKhuyenMaiServiceimpl.add(hdkm);
        return "redirect:/hoa_don_khuyen_mai/index";

    }
}
