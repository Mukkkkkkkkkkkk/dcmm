package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "danh_muc")
@Builder
public class DanhMuc {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "ten")
    @NotBlank(message = "Tên không được để trống")
    private String ten;

    @Column(name = "trang_thai")
//    @NotBlank(message = "Tên không được để trống")
    private Integer trangThai;

    public DanhMuc(String ten, Integer trangThai) {
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
