package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "khuyen_mai")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class KhuyenMai {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private long id;


    @Column(name = "ma")
    private String ma;

    @Column(name = "ten")
    private String ten;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "bat_dau")
    private Timestamp batDau;

    @Column(name = "ket_thuc")
    private Timestamp ketThuc;

    @Column(name = "giam_gia")
    private float giamGia;

    @Column(name = "kieu_khuyen_mai")
    private int kieuKhuyenMai;
    @Column(name = "dieu_kien")
    private float dieuKien;
    @Column(name = "so_luong")
    private int soLuong;
    @Column(name = "trang_thai")
    private int trangThai;


}
