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
@Table(name = "thuong_hieu")
@Builder
public class ThuongHieu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "ten")
    private String ten;

    @Column(name = "trang_thai")
    private Integer trangThai;

//    public String layTrangThai(){
//        if(trangThai == true){
//            return "Active";
//        }else{
//            return "Inactive";
//        }
//    }
//
//    public ThuongHieu(String ten, Boolean trangThai) {
//        this.ten = ten;
//        this.trangThai = trangThai;
//    }
}
