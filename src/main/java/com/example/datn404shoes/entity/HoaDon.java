package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hoa_don")
@Builder
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ma_hoa_don")
    private String maHoaDon;

    @Column(name = "ngay_tao")
    private Date ngayTao;

    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;

    @Column(name = "trang_thai")
    private int trangThai;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @ManyToOne
    @JoinColumn(name = "tai_khoan_id", referencedColumnName = "id", nullable = true)
    private TaiKhoan taiKhoan;

    @ManyToOne
    @JoinColumn(name = "thanh_toan_id", referencedColumnName = "id", nullable = true)
    private ThanhToan thanhToan;

    @Column(name = "kieu_hoa_don")
    private Integer kieuHoaDon;

    @Column(name = "tong_tien")
    private Float tongTien;

    @Column(name = "phi_ship")
    private Float phiShip;

    @Column(name = "tien_giam")
    private Float tienGiam;

    @Column(name = "tong_tien_sau_giam")
    private Float tongTienSauGiam;

    @Column(name = "ten")
    private String ten;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "email")
    private String email;

    @Column(name = "dia_chi_cu_the")
    private String diaChiCuThe;

    @Column(name = "tinh_thanh_pho")
    private String tinhThanhPho;

    @Column(name = "quan_huyen")
    private String quanHuyen;

    @Column(name = "xa_phuong_thi_tran")
    private String xaPhuongThiTran;

}
