package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;


@Entity
@Table(name = "dia_chi")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiaChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "ten")
    private String ten;

    @Column(name = "so_dien_thoai")
    private String sdt;

    @Column(name = "dia_chi_cu_the")
    private String diaChiCuThe;

    @Column(name = "tinh_thanh_pho")
    private String tinhThanhPho;

    @Column(name = "quan_huyen")
    private String quanHuyen;

    @Column(name = "xa_phuong_thi_tran")
    private String xaPhuongThiTran;

    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @ManyToOne
    @JoinColumn(name = "thong_tin_nguoi_dung_id", referencedColumnName = "id", nullable = true)
    private ThongTinNguoiDung thongTinNguoiDung;

}
