package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.entity.SanPhamAnh;
import com.example.datn404shoes.request.SanPhamCustom;
import com.example.datn404shoes.service.serviceimpl.SanPhamAnhServiceimpl;
import com.example.datn404shoes.service.serviceimpl.SanPhamServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("san_pham_anh")
public class SanPhamAnhController {
    @Autowired
    SanPhamAnhServiceimpl sanPhamAnhServiceimpl;
    @Autowired
    SanPhamServiceimpl sanPhamServiceimpl;
    private final Path root = Paths.get("frontend/public/niceadmin/img/");

    @GetMapping("index")
    public List<SanPhamCustom> index(Model model){

        return sanPhamAnhServiceimpl.getAllSPCoAnh();
    }

    @GetMapping("detail/{id}")
    public List<SanPhamAnh> detail(@PathVariable("id") long id){

        return sanPhamAnhServiceimpl.getAllAnh(id);
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") long id){
        sanPhamAnhServiceimpl.delete(id);
        return ResponseEntity.ok(id);
    }
    @PostMapping(value = "add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> upload(
            @RequestParam("files") MultipartFile[] files,
            @RequestParam("sanPham") Long id) {
        String message = "";
        try {
            List<String> fileNames = new ArrayList<>();

            Arrays.asList(files).stream().forEach(file -> {
                SanPhamAnh a = new SanPhamAnh();
                File uploadRootDir = new File(String.valueOf(root));
                if(!uploadRootDir.exists()){
                    uploadRootDir.mkdirs();
                }try{
                    String filename= file.getOriginalFilename();
                    File serverFile = new File(uploadRootDir.getAbsoluteFile() + File.separator + filename);
                    BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                    stream.write(file.getBytes());
                    a.setSanPham(sanPhamServiceimpl.getOne(id));
                    a.setAnh(filename);
                    sanPhamAnhServiceimpl.save(a);
                    stream.close();
                }catch (Exception e){

                }
            });

            message = "Uploaded the files successfully: " + fileNames;
        } catch (Exception e) {
            message = "Fail to upload files!";
        }
        return ResponseEntity.ok(message);
    }

    @PostMapping(value = "upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> upload1(
            @RequestParam("files") MultipartFile[] files) {
        String message = "";
        try {
            List<String> fileNames = new ArrayList<>();

            Arrays.asList(files).stream().forEach(file -> {
                File uploadRootDir = new File(String.valueOf(root));
                if(!uploadRootDir.exists()){
                    uploadRootDir.mkdirs();
                }try{
                    String filename= file.getOriginalFilename();
                    File serverFile = new File(uploadRootDir.getAbsoluteFile() + File.separator + filename);
                    BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                    stream.write(file.getBytes());
                    stream.close();
                }catch (Exception e){

                }
            });

            message = "Uploaded the files successfully: " + fileNames;
        } catch (Exception e) {
            message = "Fail to upload files!";
        }
        return ResponseEntity.ok(message);
    }
}
