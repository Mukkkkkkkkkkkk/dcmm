package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.KichThuoc;
//import com.poly.duanbangiay.entity.KichThuoc;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KichThuocRepository extends JpaRepository<KichThuoc, Long> {
    boolean existsKichThuocByGiaTri(Integer name);

}
