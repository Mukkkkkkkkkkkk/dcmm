package com.example.datn404shoes.repository;

//import com.poly.duanbangiay.entity.ThanhToan;
import com.example.datn404shoes.entity.ThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThanhToanRepository extends JpaRepository<ThanhToan,Long> {
}
