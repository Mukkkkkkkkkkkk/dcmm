package com.example.datn404shoes.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamChiTietRequest {

    private long sanPham;
    private long mauSac;

    private long kichThuoc;
    private Integer soLuong;

    private Integer trangThai;
}
