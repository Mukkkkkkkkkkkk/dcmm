package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.DanhMuc;
import com.example.datn404shoes.repository.DanhMucRepository;
import com.example.datn404shoes.service.serviceimpl.DanhMucServiceimpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;


import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("danh_muc")
public class DanhMucController {
    @Autowired
    DanhMucServiceimpl serviceimpl;
    @Autowired
    DanhMucRepository repository;
    @GetMapping("hien_thi")
    public ResponseEntity<?> index(Model model, Pageable pageable) {
        return ResponseEntity.ok(serviceimpl.getAll(pageable));
    }

    @GetMapping("index")
    public ResponseEntity<?> index1(Model model) {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("add")
    public ResponseEntity<?> add(Model model, @RequestBody DanhMuc danhMuc, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<FieldError> errors = bindingResult.getFieldErrors();
            String errorMessage = errors.stream().map(error -> error.getDefaultMessage()).collect(Collectors.joining(", "));

            return ResponseEntity.badRequest().body(errorMessage);
        } else if (serviceimpl.isDanhMucNameUnique(danhMuc.getTen())) {
            System.out.println("Đã trùng");
            return ResponseEntity.badRequest().body("Tên danh mục đã tồn tại.");
        } else {
            return ResponseEntity.ok(serviceimpl.add(danhMuc));
        }
    }




    @DeleteMapping("delete/{id}")
    public String delete(Model model,
                         @PathVariable("id") Long id) {
        serviceimpl.delete(id);
        return "OK";
    }

    @GetMapping("hien_thi/{id}")
    public ResponseEntity<?> detail(Model model,
                                    @PathVariable("id") Long id) {
        return ResponseEntity.ok(serviceimpl.getOne(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("id") Long id,
                                    @RequestBody DanhMuc danhMuc) {

        return ResponseEntity.ok(serviceimpl.update(id, danhMuc));
    }

    @PutMapping("updatett/{id}")
    public ResponseEntity<?> updatett(Model model,
                                      @PathVariable("id") Long id,
                                      @RequestBody Map<String, Integer> trangThaiData) {
        Integer newTrangThai = trangThaiData.get("trangThai");
        DanhMuc danhMuc1 = serviceimpl.getOne(id);
        danhMuc1.setTrangThai(newTrangThai);
        return ResponseEntity.ok(serviceimpl.thayDoiTrangThai(id, danhMuc1));
    }

}
