package com.example.datn404shoes.request;

import com.example.datn404shoes.entity.KichThuocValue;
import com.example.datn404shoes.entity.MauSacValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SPCTRequest {
    private KichThuocValue kichThuoc;
    private MauSacValue mauSac;
    private Integer soLuong;
    private double gia;
}
