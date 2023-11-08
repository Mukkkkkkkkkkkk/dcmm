package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "thanh_toan")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThanhToan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "ten")
    private String ten;

    @Column(name = "trang_thai")
    private String trangThai;


}
