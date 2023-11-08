package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "lich_su_hoa_don")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class LichSuHoaDon {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;

    @ManyToOne()
    @JoinColumn(
            name = "ma_hoa_don",
            referencedColumnName = "id",
            nullable = true
    )
    private HoaDon hoaDon;

    @ManyToOne()
    @JoinColumn(
            name = "san_pham_chi_tiet",
            referencedColumnName = "id",
            nullable = true
    )
    private SanPhamChiTiet sanPhamChiTiet;

    @ManyToOne()
    @JoinColumn(
            name = "phuong_thuc_thanh_toan",
            referencedColumnName = "id",
            nullable = true
    )
    private ThanhToan thanhToan;

    @ManyToOne()
    @JoinColumn(
            name = "nguoi_nhan",
            referencedColumnName = "id",
            nullable = true
    )
    private TaiKhoan taiKhoan;

    @ManyToOne()
    @JoinColumn(
            name = "khuyen_mai",
            referencedColumnName = "id",
            nullable = true
    )
    private KhuyenMai khuyenMai;

    @Column(name = "ngay_tao_hoa_don")
    private Date ngayTaoHoaDon;

    @Column(name = "tong_tien")
    private Float tongTien;

    @Column(name = "dia_chi_giao")
    private String diaChiGiao;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @Column(name = "trang_thai_hoa_don")
    private Integer trangThaiHoaDon;

}
