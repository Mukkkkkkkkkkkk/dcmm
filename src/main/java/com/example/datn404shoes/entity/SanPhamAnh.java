package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "san_pham_anh")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SanPhamAnh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @ManyToOne
    @JoinColumn(name = "san_pham_id", referencedColumnName = "id", nullable = true)
    private SanPham sanPham;
    @Column(name = "anh")
    private String anh;


}
