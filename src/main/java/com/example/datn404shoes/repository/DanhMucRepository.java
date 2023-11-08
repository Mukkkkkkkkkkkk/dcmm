package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.DanhMuc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DanhMucRepository extends JpaRepository<DanhMuc,Long> {
    boolean existsDanhMucByTen(String name);
}
