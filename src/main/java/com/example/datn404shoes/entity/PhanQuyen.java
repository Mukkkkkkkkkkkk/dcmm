package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "phan_quyen")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class PhanQuyen {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @ManyToOne()
    @JoinColumn(
            name = "tai_khoan_id",
            referencedColumnName = "id",
            nullable = true
    )

    private TaiKhoan taiKhoan;

    @ManyToOne()
    @JoinColumn(
            name = "quyen_id",
            referencedColumnName = "id",
            nullable = true
    )
    private Quyen quyen;

}
