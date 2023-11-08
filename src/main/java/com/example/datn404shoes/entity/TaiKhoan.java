package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "tai_khoan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaiKhoan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "ma_tai_khoan")
    private String maTaiKhoan;

    @Column(name = "email")
    private String email;

    @Column(name = "ngay_tao")
    private Date ngayTao;

    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;

    @Column(name = "password")
    private String password;

    @Column(name = "anh")
    private String anh;


    @Column(name = "trang_thai")
    private boolean trangThai;


    @ManyToOne
    @JoinColumn(name = "thong_tin_nguoi_dung_id")
    private ThongTinNguoiDung thongTinNguoiDung;



}
