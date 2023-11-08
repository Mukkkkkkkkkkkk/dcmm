package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.MauSac;
import com.example.datn404shoes.entity.Quyen;
import com.example.datn404shoes.repository.MauSacRepository;
import com.example.datn404shoes.repository.QuyenResponsitory;
import com.example.datn404shoes.service.serviceimpl.MauSacServiceImpl;
import com.example.datn404shoes.service.serviceimpl.QuyenServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("quyen")
public class QuyenController {
    @Autowired
    QuyenServiceimpl serviceimpl;
    @Autowired
    QuyenResponsitory repository;
    @GetMapping("hien_thi")
    public ResponseEntity<?> hienThi(Model model, Pageable pageable) {
        return ResponseEntity.ok(serviceimpl.findAll(pageable));
    }

    @GetMapping("index")
    public ResponseEntity<?> index1(Model model) {
        return ResponseEntity.ok(repository.findAll());
    }
//    @GetMapping("create")
//    public String create(Model model) {
//        model.addAttribute("view", "/mau_sac/mau_sac_add.jsp");
//        return "admin/index";
//    }

//    @PostMapping("add")
//    public ResponseEntity<?> themMoi(Model model,
//                                     @RequestBody Quyen quyen
//                                     ) {
//        return ResponseEntity.ok(serviceimpl.add(quyen));
//    }
//
//    @PutMapping("update/{id}")
//    public ResponseEntity<?> update(Model model,
//                                    @PathVariable("id") Long id,
//                                    @RequestBody Quyen quyen
//    ) {
//
//        return ResponseEntity.ok(serviceimpl.update(id, quyen));
//    }
//
//    @DeleteMapping("delete/{id}")
//    public String delete(Model model, @PathVariable("id") Long id) {
//        serviceimpl.delete(id);
//        return "redirect:/quyen/hien_thi";
//    }
//
//    @GetMapping("hien_thi/{id}")
//    public ResponseEntity<?> detail(Model model, @PathVariable("id") Long id) {
//        return ResponseEntity.ok(serviceimpl.getOne(id));
//
//    }

//    @PostMapping(value = "import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public String importExcel(@RequestParam("file") MultipartFile file) throws IOException {
//        String message = "";
////        if (MauSacExcelSave.hasExcelFormat(file)) {
////            try {
////                mauSacService.imPortExcel(file);
////            } catch (Exception e) {
////                e.printStackTrace();
////            }
////        }
////        message = "Please upload an excel file!";
//        return "redirect:/mau_sac/hien_thi";
//    }

//    @PutMapping("update/{id}")
//    public ResponseEntity<?> updatett(Model model,
//                                      @PathVariable("id") Long id,
//                                      @RequestBody Map<String, Integer> trangThaiData) {
//        Integer newTrangThai = trangThaiData.get("trangThai");
//        MauSac mauSac = mauSacService.findOne(id);
//        mauSac.setTrangThai(newTrangThai);
//        return ResponseEntity.ok(mauSacService.thayDoiTrangThai(id, mauSac));
//    }
}
