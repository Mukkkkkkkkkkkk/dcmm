package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.KhuyenMai;
import com.example.datn404shoes.helper.KhuyenMaiExcelSave;
import com.example.datn404shoes.repository.KhuyenMaiRepository;
import com.example.datn404shoes.service.serviceimpl.KhuyenMaiServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("khuyen_mai")
public class KhuyenMaiController {
    @Autowired
    private KhuyenMaiServiceImpl khuyenMaiServiceImpl;
    @Autowired
    KhuyenMaiRepository repository;

    @GetMapping("index")
    public ResponseEntity<?> index(Model model, Pageable pageable){
        return ResponseEntity.ok(khuyenMaiServiceImpl.getAll(pageable));
    }

    @PostMapping("add")
    public ResponseEntity<?> add(Model model,
                                 @RequestBody KhuyenMai khuyenMai, BindingResult bindingResult){
        {
            if (bindingResult.hasErrors()) {
                List<FieldError> errors = bindingResult.getFieldErrors();
                String errorMessage = errors.stream().map(error -> error.getDefaultMessage()).collect(Collectors.joining(", "));

                return ResponseEntity.badRequest().body(errorMessage);
         }
//            else if (khuyenMaiServiceImpl.isKhuyenMaiNameUnique(khuyenMai.getMa())) {
//                System.out.println("Đã trùng");
//                return ResponseEntity.badRequest().body("Mã  khuyến mãi đã tồn tại.");
//            }
            else if (khuyenMaiServiceImpl.isKhuyenMaiNameUnique(khuyenMai.getTen())) {
                System.out.println("Đã trùng");
                return ResponseEntity.badRequest().body("Tên khuyến mãi đã tồn tại.");
            } else {
                return ResponseEntity.ok(khuyenMaiServiceImpl.add(khuyenMai));
            }
        }
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id){
        khuyenMaiServiceImpl.delete(id);
        Map<String,Boolean>respose = new HashMap<>();
        respose.put("Delete",Boolean.TRUE);
        return ResponseEntity.ok(respose);
    }
    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id")Long id){
        return ResponseEntity.ok(khuyenMaiServiceImpl.findOne(id));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("id")Long id,
                                    @RequestBody KhuyenMai khuyenMai){
        return ResponseEntity.ok(khuyenMaiServiceImpl.update(id,khuyenMai));
    }
//    @PostMapping(value = "import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public String importExecel(@RequestParam("file")MultipartFile file)
//            throws IOException{
//        String message ="";
//        if(KhuyenMaiExcelSave.hasExcelFormat(file)){
//            try {
//                khuyenMaiServiceImpl.imPortExcel(file);
//            }catch (Exception e){
//                e.printStackTrace();
//            }
//        }
//        message = "Please upload an excel file!";
//        return "redirect:/khuyen_mai/index";
//    }
//    @Scheduled(cron = " 0 48 1 * * *")
//    public void task(){
//        System.out.println("123");
//    }
}
