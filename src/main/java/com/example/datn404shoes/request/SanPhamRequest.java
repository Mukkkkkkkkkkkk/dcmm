package com.example.datn404shoes.request;

import com.example.datn404shoes.entity.KichThuoc;
import com.example.datn404shoes.entity.KichThuocValue;
import com.example.datn404shoes.entity.MauSacValue;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamRequest {
    private List<String> files;
    private String ma;
    private String ten;
    private double donGia;
    private String moTa;
    private long thuongHieuId;
    private long xuatXuId;
    private long danhMucId;
    private List<MauSacValue> listMauSac;
    private List<KichThuocValue> listKichThuoc;
    private List<SPCTRequest> listSPCT;
}
