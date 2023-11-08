package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "san_pham_chi_tiet")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Builder
public class SanPhamChiTiet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "ngay_tao")
    private Date ngayTao;

    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "don_gia")
    private double donGia;


    @ManyToOne
    @JoinColumn(name = "kich_thuoc", referencedColumnName = "id", nullable = true)
    private KichThuoc kichThuoc;

    @ManyToOne
    @JoinColumn(name = "mau_sac", referencedColumnName = "id", nullable = true)
    private MauSac mauSac;
    @ManyToOne
    @JoinColumn(name = "san_pham_id", referencedColumnName = "id", nullable = true)
    private SanPham sanPham;

    public SanPhamChiTiet(Integer trangThai, Integer soLuong, SanPham sanPhamId) {
        this.trangThai = trangThai;
        this.soLuong = soLuong;
        this.sanPham = sanPhamId;
    }
}
