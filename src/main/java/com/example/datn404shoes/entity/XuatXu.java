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
@Table(name = "xuat_xu")
@Builder
public class XuatXu {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "ten")
    private String ten;
    @Column(name = "trang_thai")
    private Integer trangThai;

    public XuatXu(String ten, Integer trangThai) {
        this.ten = ten;
        this.trangThai = trangThai;
    }

    public String layTrangThai(){
        if(trangThai == 1){
            return "Active";
        }else{
            return "Inactive";
        }
    }
}
