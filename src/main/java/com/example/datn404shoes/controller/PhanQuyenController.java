package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.*;
import com.example.datn404shoes.request.PhanQuyenRepuest;
import com.example.datn404shoes.request.SanPhamChiTietRequest;
import com.example.datn404shoes.service.serviceimpl.PhanQuyenServiceimpl;
import com.example.datn404shoes.service.serviceimpl.SanPhamChiTietServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("phan_quyen")
public class PhanQuyenController {
    @Autowired
    PhanQuyenServiceimpl serviceimpl;

    @GetMapping("index")
    public ResponseEntity<?> index(Pageable pageable) {
        return ResponseEntity.ok(serviceimpl.getAllPhanTrang(pageable));
    }
//    @GetMapping("index1")
//    public ResponseEntity<?> phanQuyen(@PathVariable("id") Long id) {
//        return ResponseEntity.ok(serviceimpl.findPhanQuyenByQuyenId(id));
//    }
    @PostMapping("add")
    public PhanQuyen add(@RequestBody PhanQuyenRepuest phanQuyen) {

        PhanQuyen phanQuyen1 = new PhanQuyen();
        phanQuyen1.setTaiKhoan(TaiKhoan.builder().id(phanQuyen.getTaiKhoanId()).build());
        phanQuyen1.setQuyen(Quyen.builder().id(phanQuyen.getQuyenId()).build());
        return serviceimpl.add(phanQuyen1);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        serviceimpl.delete(id);
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
                                    @RequestBody PhanQuyen phanQuyen) {

        return ResponseEntity.ok(serviceimpl.update(id, phanQuyen));
    }

}
