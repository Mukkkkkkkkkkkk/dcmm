package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.*;
import com.example.datn404shoes.helper.SanPhamExcelSave;
import com.example.datn404shoes.helper.SanPhamExport;
import com.example.datn404shoes.repository.SanPhamAnhRespository;
import com.example.datn404shoes.repository.SanPhamChiTietRepository;
import com.example.datn404shoes.repository.SanPhamRespository;
import com.example.datn404shoes.request.SPCTRequest;
import com.example.datn404shoes.request.SanPhamRequest;
import com.example.datn404shoes.service.serviceimpl.SanPhamAnhServiceimpl;
import com.example.datn404shoes.service.serviceimpl.SanPhamServiceimpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("san_pham")
public class SanPhamController {
    @Autowired
    SanPhamServiceimpl sanPhamServiceimpl;
    @Autowired
    SanPhamRespository sanPhamRespository;
    @Autowired
    SanPhamAnhServiceimpl sanPhamAnhServiceimpl;
    @Autowired
    SanPhamChiTietRepository sanPhamChiTietRepository;
    @Autowired
    SanPhamAnhRespository sanPhamAnhRespository;
    private final Path root = Paths.get("frontend/src/img");
    @GetMapping("index")
    public Page<SanPham> index(Pageable pageable){
        return sanPhamServiceimpl.getAllPhanTrang(pageable);
    }
    @GetMapping("index1")
    public List<SanPham> index1(){
        return sanPhamServiceimpl.getAll();
    }
    @PostMapping("add")
//    public SanPham add(@RequestBody SanPham sanPham){
//
//        return sanPhamServiceimpl.add(sanPham);
//    }
    public SanPham add(@RequestBody SanPhamRequest sanPham){
        Long list = sanPhamRespository.count();
        SanPham a = new SanPham();
        a.setMa("SP" + (list+1));
        a.setTen(sanPham.getTen());
        a.setMoTa(sanPham.getMoTa());
        a.setTrangThai(1);
        a.setNgayCapNhat(java.sql.Date.valueOf(LocalDate.now()));
        a.setNgayTao(java.sql.Date.valueOf(LocalDate.now()));
        a.setAnh(sanPham.getFiles().get(0));
        a.setDanhMuc(DanhMuc.builder().id(sanPham.getDanhMucId()).build());
        a.setXuatXu(XuatXu.builder().id(sanPham.getXuatXuId()).build());
        a.setThuongHieu(ThuongHieu.builder().id(sanPham.getThuongHieuId()).build());
        sanPhamServiceimpl.add(a);
//        for (MauSacValue ms:sanPham.getListMauSac()){
//            for (KichThuocValue kt:sanPham.getListKichThuoc()){
//                SanPhamChiTiet spct = new SanPhamChiTiet();
//                spct.setNgayTao(java.sql.Date.valueOf(LocalDate.now()));
//                spct.setNgayCapNhat(java.sql.Date.valueOf(LocalDate.now()));
//                spct.setSoLuong(0);
//                spct.setTrangThai(1);
//                spct.setMauSac(MauSac.builder().id(ms.getValue()).build());
//                spct.setKichThuoc(KichThuoc.builder().id(kt.getValue()).build());
//                spct.setSanPham(a);
//                sanPhamChiTietRepository.save(spct);
//            }
//
//        }
        for(SPCTRequest spct:sanPham.getListSPCT()){
            SanPhamChiTiet sanPhamChiTiet = new SanPhamChiTiet();
            sanPhamChiTiet.setSanPham(a);
            sanPhamChiTiet.setNgayTao(java.sql.Date.valueOf(LocalDate.now()));
            sanPhamChiTiet.setNgayCapNhat(java.sql.Date.valueOf(LocalDate.now()));
            sanPhamChiTiet.setMauSac(MauSac.builder().id(spct.getMauSac().getValue()).build());
            sanPhamChiTiet.setKichThuoc(KichThuoc.builder().id(spct.getKichThuoc().getValue()).build());
            sanPhamChiTiet.setSoLuong(spct.getSoLuong());
            sanPhamChiTiet.setDonGia(spct.getGia());
            sanPhamChiTiet.setTrangThai(1);
            sanPhamChiTietRepository.save(sanPhamChiTiet);
        }
        for(String file : sanPham.getFiles()){
            SanPhamAnh spa = new SanPhamAnh();
            spa.setAnh(file);
            spa.setSanPham(a);
            sanPhamAnhServiceimpl.save(spa);
        }
        return a;
    }
    @PostMapping("add_spct/{id}")
//    public SanPham add(@RequestBody SanPham sanPham){
//
//        return sanPhamServiceimpl.add(sanPham);
//    }
    public ResponseEntity<?> addSPCT(@PathVariable("id") long id,@RequestBody SanPhamRequest sanPham){
        List<SanPhamChiTiet> list = sanPhamChiTietRepository.getAllSPCT(id);
        for (MauSacValue ms:sanPham.getListMauSac()){
            for (KichThuocValue kt:sanPham.getListKichThuoc()){
                int count = 0;
                for(int i = 0 ; i <list.size();i++){
                    if(list.get(i).getMauSac().getId() == ms.getValue() && list.get(i).getKichThuoc().getId() == kt.getValue()){
                        count++;
                    }
                }
                if(count == 0){
                    SanPhamChiTiet spct = new SanPhamChiTiet();
                    spct.setNgayTao(java.sql.Date.valueOf(LocalDate.now()));
                    spct.setNgayCapNhat(java.sql.Date.valueOf(LocalDate.now()));
                    spct.setSoLuong(0);
                    spct.setTrangThai(1);
                    spct.setMauSac(MauSac.builder().id(ms.getValue()).build());
                    spct.setKichThuoc(KichThuoc.builder().id(kt.getValue()).build());
                    spct.setSanPham(SanPham.builder().id(id).build());
                    sanPhamChiTietRepository.save(spct);
                }else {

                }
            }
        }
        return ResponseEntity.ok("a");
    }
    @GetMapping("detail_spa/{id}")
    public ResponseEntity<?> detailSPA(@PathVariable("id") Long id) {

        return ResponseEntity.ok(sanPhamAnhRespository.getAllAnh(id));
    }

    @GetMapping("detail_spct/{id}")
    public ResponseEntity<?> detailSPCT(@PathVariable("id") Long id) {

        return ResponseEntity.ok(sanPhamChiTietRepository.getAllSPCT(id));
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") long id){
        sanPhamServiceimpl.delete(id);
        Map<String,Boolean> response =new HashMap<>();
        response.put("Delete",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") long id){
        SanPham a = sanPhamServiceimpl.getOne(id);
        SanPhamValue b = new SanPhamValue();
        b.setAnh(a.getAnh());
        b.setMa(a.getMa());
        b.setDanhMuc(a.getDanhMuc().getId());
        b.setTen(a.getTen());
        b.setMoTa(a.getMoTa());
        b.setThuongHieu(a.getThuongHieu().getId());
        b.setTrangThai(a.getTrangThai());
        b.setXuatXu(a.getXuatXu().getId());
        return ResponseEntity.ok(b);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(Model model,
                                    @PathVariable("id") long id, @RequestBody SanPhamRequest sanPham){
        System.out.println(sanPham.getFiles());
        SanPham a = sanPhamServiceimpl.getOne(id);
        a.setTen(sanPham.getTen());
        a.setMoTa(sanPham.getMoTa());
        a.setNgayCapNhat(java.sql.Date.valueOf(LocalDate.now()));
        a.setDanhMuc(DanhMuc.builder().id(sanPham.getDanhMucId()).build());
        a.setXuatXu(XuatXu.builder().id(sanPham.getXuatXuId()).build());
        a.setThuongHieu(ThuongHieu.builder().id(sanPham.getThuongHieuId()).build());
        sanPhamRespository.save(a);
        System.out.println(sanPham.getFiles().toArray());
        for(String file : sanPham.getFiles()){
            SanPhamAnh spa = new SanPhamAnh();
            spa.setAnh(file);
            spa.setSanPham(a);
            sanPhamAnhServiceimpl.save(spa);
        }
        return ResponseEntity.ok(a);
    }

    @PostMapping( value = "import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String importExcel(@RequestParam("file") MultipartFile file) throws IOException {
        String message = "";
        if (SanPhamExcelSave.hasExcelFormat(file)) {
            try {
                sanPhamServiceimpl.importExcel(file);
            } catch (Exception e) {

            }
        }

        message = "Please upload an excel file!";

        return "redirect:/san_pham/index";
    }

    @GetMapping("export")
    public void exportToExcel(HttpServletResponse response,Pageable pageable) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=users_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        List<SanPham> listSP = sanPhamServiceimpl.getAll();

        SanPhamExport excelExporter = new SanPhamExport((listSP));

        excelExporter.export(response);
    }
}
