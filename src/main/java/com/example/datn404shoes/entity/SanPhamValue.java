package com.example.datn404shoes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamValue {
    private String ma;
    private String ten;
    private double donGia;
    private int trangThai;
    private String moTa;
    private String anh;
    private long thuongHieu;
    private long xuatXu;
    private long danhMuc;
}
