package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "gio_hang")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder
public class GioHang {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "ngay_tao", nullable = false)
    private Date ngayTao;

    @Column(name = "ghi_chu", nullable = false, length = 255)
    private String ghiChu;

    @Column(name = "trang_thai", nullable = false)
    private int trangThai;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tai_khoan_id", referencedColumnName = "id")
    private TaiKhoan taiKhoan ;
}
