package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.KhuyenMai;
import com.example.datn404shoes.helper.KhuyenMaiExcelSave;
import com.example.datn404shoes.repository.KhuyenMaiRepository;
import com.example.datn404shoes.service.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.crypto.Data;
import java.io.IOException;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class KhuyenMaiServiceImpl implements KhuyenMaiService {

    @Autowired
    KhuyenMaiRepository khuyenMaiRepository;

    @Override
    public Page<KhuyenMai> getAll(Pageable pageable) {

        return  khuyenMaiRepository.findAll(pageable);
    }

    @Override
//    public KhuyenMai add(KhuyenMai khuyenMai) {
//       khuyenMai.setBatDau(Date.valueOf(LocalDate.now()));
//       khuyenMai.setKetThuc(Date.valueOf(LocalDate.now()));
//       return khuyenMaiRepository.save(khuyenMai);
//    }
    public KhuyenMai add(KhuyenMai khuyenMai) {
        Timestamp ngayBatDau = (khuyenMai.getBatDau());
        Timestamp ngayKetThuc = (khuyenMai.getKetThuc());
        khuyenMai.setBatDau(ngayBatDau);
        khuyenMai.setKetThuc(ngayKetThuc);
        return khuyenMaiRepository.save(khuyenMai);
    }

    @Override
    public void delete(Long id) {

        KhuyenMai a = khuyenMaiRepository.findById(id).get();
        if(a.getKieuKhuyenMai()==1){
            a.setKieuKhuyenMai(0);
        }else{
            a.setKieuKhuyenMai(1);
        }
        khuyenMaiRepository.flush();
    }

    @Override
    public KhuyenMai update(Long id, KhuyenMai km) {
        KhuyenMai khuyenMai = findOne(id);
        khuyenMai.setMa(km.getMa());
        khuyenMai.setTen(km.getTen());
        khuyenMai.setMoTa(km.getMoTa());
        Timestamp ngayBatDau = (khuyenMai.getBatDau());
        Timestamp ngayKetThuc = (khuyenMai.getKetThuc());
        khuyenMai.setBatDau(ngayBatDau);
        khuyenMai.setKetThuc(ngayKetThuc);
        khuyenMai.setGiamGia(km.getGiamGia());
        khuyenMai.setKieuKhuyenMai(km.getKieuKhuyenMai());
        khuyenMai.setDieuKien(km.getDieuKien());
        khuyenMai.setSoLuong(km.getSoLuong());
        khuyenMai.setTrangThai(km.getTrangThai());
        khuyenMaiRepository.save(km);
        return km;
    }


    @Override
    public Optional<KhuyenMai> detail(Long id) {
        return khuyenMaiRepository.findById(id);
    }


    @Override
    public KhuyenMai findOne(Long id) {

        return khuyenMaiRepository.findById(id).get();
    }

    @Override
    public Page<KhuyenMai> findAll(Pageable pageable) {
        return khuyenMaiRepository.findAll(pageable);
    }

    @Override
    public void imPortExcel(MultipartFile file) {
        try {
            List<KhuyenMai> importEX = KhuyenMaiExcelSave.excelImport(file.getInputStream());
            for (KhuyenMai khuyenMai: importEX){
                add(khuyenMai);
                khuyenMai.toString();
            }
        }catch (IOException e){
            e.printStackTrace();
            throw new RuntimeException("fail to store excel data:" + e.getMessage());
        }
    }


    @Override
    public boolean isKhuyenMaiNameUnique(String name) {
        return khuyenMaiRepository.existsKhuyenMaiByTen(name);
    }
}
