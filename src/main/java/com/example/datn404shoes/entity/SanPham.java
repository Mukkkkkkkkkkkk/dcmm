package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "san_pham")
@Builder
public class SanPham {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "ma_san_pham")
    private String ma;
    @Column(name = "ngay_tao")
    private Date ngayTao;
    @Column(name = "ten")
    private String ten;
    @Column(name = "trang_thai")
    private int trangThai;
    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;
    @Column(name = "mo_ta")
    private String moTa;
    @Column(name = "anh_bia")
    private String anh;
    @ManyToOne
    @JoinColumn(name = "thuong_hieu", referencedColumnName = "id", nullable = true)
    private ThuongHieu thuongHieu;

    @ManyToOne
    @JoinColumn(name = "xuat_xu", referencedColumnName = "id", nullable = true)
    private XuatXu xuatXu;

    @ManyToOne
    @JoinColumn(name = "danh_muc", referencedColumnName = "id", nullable = true)
    private DanhMuc danhMuc;
}
