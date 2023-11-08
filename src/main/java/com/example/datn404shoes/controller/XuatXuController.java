package com.example.datn404shoes.controller;



import com.example.datn404shoes.entity.XuatXu;
import com.example.datn404shoes.repository.XuatXuRepository;
import com.example.datn404shoes.service.serviceimpl.XuatXuServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("xuat_xu")
public class XuatXuController {

    @Autowired
    XuatXuServiceimpl xuatXuServiceimpl;
    @Autowired
    XuatXuRepository repository;
    @GetMapping("hien_thi")
    public ResponseEntity<?> hienThi(Model model, Pageable pageable) {
        return ResponseEntity.ok(xuatXuServiceimpl.getAll(pageable));
    }
    @GetMapping("index")
    public ResponseEntity<?> index1(Model model) {
        return ResponseEntity.ok(repository.findAll());
    }
//    @GetMapping("create")
//    public String addView(Model model) {
//        model.addAttribute("listXuatXu", xuatXuServiceimpl.findAll());
//        model.addAttribute("view", "/kich_thuoc/kich_thuoc_add.jsp");
//        return "admin/index";
//    }

    @PostMapping("add")
    public ResponseEntity<?> themMoi(Model model,
                                     @RequestBody XuatXu xuatXu, BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            List<FieldError> errors = bindingResult.getFieldErrors();
            String errorMessage = errors.stream().map(error -> error.getDefaultMessage()).collect(Collectors.joining(", "));

            return ResponseEntity.badRequest().body(errorMessage);
        } else if (xuatXuServiceimpl.isXuatXuNameUnique(xuatXu.getTen())) {
            System.out.println("Đã trùng");
            return ResponseEntity.badRequest().body("Tên xuất xứ đã tồn tại.");
        } else {
            return ResponseEntity.ok(xuatXuServiceimpl.add(xuatXu));
        }
    }

    @PutMapping("update/{idud}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("idud") Long idud,
                                    @RequestBody XuatXu xuatXu
    ) {
        return ResponseEntity.ok(xuatXuServiceimpl.update(idud,xuatXu));
    }

    @DeleteMapping("delete/{idx}")
    public String xoa(Model model, @PathVariable("idx") Long idx) {
        xuatXuServiceimpl.delete(idx);
        return "ok";
    }

    @GetMapping("hien_thi/{iddt}")
    public ResponseEntity<?> detail(Model model, @PathVariable("iddt") Long iddt) {
        return ResponseEntity.ok(xuatXuServiceimpl.getOne(iddt));

    }

    @PutMapping("updatett/{id}")
    public ResponseEntity<?> updatett(Model model,
                                      @PathVariable("id") Long id,
                                      @RequestBody Map<String, Integer> trangThaiData) {
        Integer newTrangThai = trangThaiData.get("trangThai");
        XuatXu xuatXu = xuatXuServiceimpl.getOne(id);
        xuatXu.setTrangThai(newTrangThai);
        return ResponseEntity.ok(xuatXuServiceimpl.thayDoiTrangThai(id, xuatXu));
    }

}
