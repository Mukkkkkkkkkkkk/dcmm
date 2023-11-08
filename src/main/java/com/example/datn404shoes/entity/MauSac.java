package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity

@Table(name = "mau_sac")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class MauSac {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;

    @NotBlank(message = "Tên không được để trống")
    @Column(name = "ten")
    private String ten;

    @Column(name = "trang_thai")
    private Integer trangThai;


}
