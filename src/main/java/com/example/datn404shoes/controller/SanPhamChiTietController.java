package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.entity.SanPhamChiTiet;
import com.example.datn404shoes.repository.SanPhamChiTietRepository;
import com.example.datn404shoes.request.SanPhamChiTietRequest;
import com.example.datn404shoes.service.serviceimpl.SanPhamChiTietServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("san_pham_chi_tiet")
public class SanPhamChiTietController {
    @Autowired
    SanPhamChiTietServiceimpl serviceimpl;
    @Autowired
    SanPhamChiTietRepository repository;
    @GetMapping("index")
    public ResponseEntity<?> index(Pageable pageable) {
        return ResponseEntity.ok(serviceimpl.getAllPhanTrang(pageable));
    }

    @PostMapping("add")
    public SanPhamChiTiet add(@RequestBody SanPhamChiTietRequest spct) {

        return serviceimpl.add(spct);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        serviceimpl.delete(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Delete", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("delete1/{id}")
    public ResponseEntity<?> delete1(@PathVariable("id") Long id) {
        repository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Delete", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") Long id) {

        return ResponseEntity.ok(serviceimpl.getOne(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("id") Long id,
                                    @RequestBody SanPhamChiTietRequest spct) {

        return ResponseEntity.ok(serviceimpl.update(id, spct));
    }

    @PutMapping("updateAll")
    public ResponseEntity<?> updateAll(Model model,
                                       @RequestBody List<SanPhamChiTiet> list) {

        return ResponseEntity.ok(repository.saveAll(list));
    }
}
