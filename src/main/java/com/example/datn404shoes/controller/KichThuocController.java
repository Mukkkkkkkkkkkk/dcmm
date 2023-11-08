package com.example.datn404shoes.controller;


import com.example.datn404shoes.entity.KichThuoc;
import com.example.datn404shoes.entity.KichThuoc;
import com.example.datn404shoes.entity.KichThuocValue;
import com.example.datn404shoes.helper.KichThuocExcelSave;
import com.example.datn404shoes.repository.KichThuocRepository;
import com.example.datn404shoes.service.serviceimpl.KichThuocServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("kich_thuoc")
public class KichThuocController {

    @Autowired
    KichThuocServiceImpl kichThuocService;
    @Autowired
    KichThuocRepository repository;
    @GetMapping("hien_thi")
    public ResponseEntity<?> hienThi(Model model, Pageable pageable) {
        return ResponseEntity.ok(kichThuocService.findAll(pageable));
    }

    @GetMapping("index")
    public ResponseEntity<?> index1(Model model) {
        List<KichThuocValue> list = new ArrayList<>();
        for(KichThuoc b : repository.findAll()){
            KichThuocValue a = new KichThuocValue(b.getId(),b.getGiaTri());
            list.add(a);
        }
        return ResponseEntity.ok(list);
    }
//    @GetMapping("create")
//    public String addView(Model model) {
//        model.addAttribute("listKichThuoc", kichThuocService.findAll());
//        model.addAttribute("view", "/kich_thuoc/kich_thuoc_add.jsp");
//        return "admin/index";
//    }
    @GetMapping("index1")
    public List<KichThuoc> index2(Model model) {

        return repository.findAll();
    }
    @PostMapping("add")
    public ResponseEntity<?> themMoi(Model model,
                                     @RequestBody KichThuoc kichThuoc, BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            List<FieldError> errors = bindingResult.getFieldErrors();
            String errorMessage = errors.stream().map(error -> error.getDefaultMessage()).collect(Collectors.joining(", "));

            return ResponseEntity.badRequest().body(errorMessage);
        } else if (kichThuocService.isKichThuocNameUnique(kichThuoc.getGiaTri())) {
            System.out.println("Đã trùng");
            return ResponseEntity.badRequest().body("Kích thước đã tồn tại.");
        } else {
            return ResponseEntity.ok(kichThuocService.add(kichThuoc));
        }
    }

    @PutMapping("update/{idud}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("idud") Long idud,
                                    @RequestBody KichThuoc kichThuocUpdate
    ) {
        return ResponseEntity.ok(kichThuocService.update(kichThuocUpdate, idud));
    }

    @DeleteMapping("delete/{idx}")
    public String xoa(Model model, @PathVariable("idx") Long idx) {
        kichThuocService.delete(idx);
        return "ok";
    }

    @GetMapping("hien_thi/{iddt}")
    public ResponseEntity<?> detail(Model model, @PathVariable("iddt") Long iddt) {
        return ResponseEntity.ok(kichThuocService.detail(iddt));

    }

    @PostMapping(value = "import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String importExcel(@RequestParam("file") MultipartFile file) throws IOException {
        String message = "";
        if (KichThuocExcelSave.hasExcelFormat(file)) {
            try {
                kichThuocService.imPortExcel(file);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        message = "Please upload an excel file!";
        return "redirect:/kich_thuoc/hien_thi";
    }

    @PutMapping("updatett/{id}")
    public ResponseEntity<?> updatett(Model model,
                                      @PathVariable("id") Long id,
                                      @RequestBody Map<String, Integer> trangThaiData) {
        Integer newTrangThai = trangThaiData.get("trangThai");
        KichThuoc kichThuoc = kichThuocService.findOne(id);
        kichThuoc.setTrangThai(newTrangThai);
        return ResponseEntity.ok(kichThuocService.thayDoiTrangThai(id, kichThuoc));
    }
}
