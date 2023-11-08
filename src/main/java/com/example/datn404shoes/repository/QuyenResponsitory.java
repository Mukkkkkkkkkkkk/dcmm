package com.example.datn404shoes.repository;


import com.example.datn404shoes.entity.Quyen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuyenResponsitory extends JpaRepository<Quyen ,Long> {
}
