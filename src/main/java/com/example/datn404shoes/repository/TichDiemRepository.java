package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.DanhMuc;
import com.example.datn404shoes.entity.TichDiem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TichDiemRepository extends JpaRepository<TichDiem,Long> {
}
