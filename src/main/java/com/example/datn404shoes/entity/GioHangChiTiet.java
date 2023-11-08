package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Entity
@Table(name = "gio_hang_chi_tiet")
@Builder
public class GioHangChiTiet {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "gio_hang_id",
            referencedColumnName = "id",
            nullable = false)
    private GioHang gioHangId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "san_pham_chi_tiet_id",
            referencedColumnName = "id",
            nullable = true)
    private SanPhamChiTiet sanPhamChiTietId;

    @Column(name = "so_luong")
    private int soLuong;
}
