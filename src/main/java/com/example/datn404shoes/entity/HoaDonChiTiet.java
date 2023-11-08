package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hoa_don_chi_tiet")
@Builder
public class HoaDonChiTiet {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "ghi_chu")
    private String ghiChu;
    @Column(name = "so_luong")
    private int soLuong;
    @ManyToOne
    @JoinColumn(name = "hoa_don_id",
    referencedColumnName = "id",
    nullable = false)
    private HoaDon hd;
    @ManyToOne
    @JoinColumn(name = "san_pham_chi_tiet_id",
    referencedColumnName = "id",
    nullable = false)
    private SanPhamChiTiet sanPhamChiTiet;
}
