package com.example.datn404shoes.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "quyen")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Quyen {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "ten")
    private String ten;

    @Column(name = "trang_thai")
    private Boolean trangThai;
    //
}