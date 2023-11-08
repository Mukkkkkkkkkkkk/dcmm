package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "kich_thuoc")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class KichThuoc {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "gia_tri")
    private Integer giaTri;

    @Column(name = "trang_thai")
    private Integer trangThai;


}
