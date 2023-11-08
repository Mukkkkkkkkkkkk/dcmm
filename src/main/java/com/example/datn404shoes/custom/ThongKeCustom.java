package com.example.datn404shoes.custom;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.sql.Date;

@Data
public class ThongKeCustom {

    @JsonProperty("ngay_thang")
    private Date ngayThang;

    @JsonProperty("ten_san_pham")
    private String tenSanPham;

    @JsonProperty("doanh_thu")
    private float doanhThu;

}
