package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.entity.TichDiem;
import com.example.datn404shoes.repository.TichDiemRepository;
import com.example.datn404shoes.service.serviceimpl.TaiKhoanServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tichdiem")
public class TichDiemController {

    @Autowired
    private TaiKhoanServiceimpl taiKhoanService;

    @Autowired
    private TichDiemRepository tichDiemRepository;

    @PostMapping("/dacotaikhoan")
    public ResponseEntity<String> tichDiemDaCoTaiKhoan(@RequestParam String sdt, @RequestParam Float diem) {
        // Kiểm tra xem tài khoản có tồn tại không
        TaiKhoan taiKhoan = taiKhoanService.getOneBySDT(sdt);

        if (taiKhoan == null) {
            return new ResponseEntity<>("Tài khoản không tồn tại", HttpStatus.BAD_REQUEST);
        }

        // Kiểm tra xem tài khoản đã có thông tin tích điểm hay chưa
        TichDiem tichDiem = tichDiemRepository.findById(taiKhoan.getId()).get();

        if (tichDiem == null) {
            // Nếu chưa có, tạo một bản ghi mới
            tichDiem = new TichDiem();
            tichDiem.setTaiKhoanId(taiKhoan);
            tichDiem.setDiem(diem);
        } else {
            // Nếu đã có, cộng thêm điểm mới vào điểm hiện có
            float diemCu = tichDiem.getDiem();
            tichDiem.setDiem(diemCu + diem);
        }

        tichDiemRepository.save(tichDiem);

        return new ResponseEntity<>("Tích điểm thành công", HttpStatus.OK);
    }

    @PostMapping("/moi")
    public ResponseEntity<String> tichDiemMoi(@RequestParam String sdt, @RequestParam Float diem) {
        // Kiểm tra xem tài khoản đã tồn tại chưa
        TaiKhoan taiKhoan = taiKhoanService.getOneBySDT(sdt);

        if (taiKhoan == null) {
            return new ResponseEntity<>("Tài khoản không tồn tại", HttpStatus.BAD_REQUEST);
        }

        // Kiểm tra xem tài khoản đã có thông tin tích điểm hay chưa
        TichDiem tichDiem = tichDiemRepository.findById(taiKhoan.getId()).get();

        if (tichDiem == null) {
            // Nếu chưa có, tạo một bản ghi mới
            tichDiem = new TichDiem();
            tichDiem.setTaiKhoanId(taiKhoan);
            tichDiem.setDiem(diem);
            tichDiemRepository.save(tichDiem);

            return new ResponseEntity<>("Tích điểm thành công", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Tài khoản này đã có thông tin tích điểm.", HttpStatus.BAD_REQUEST);
        }
    }
}
