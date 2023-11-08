package com.example.datn404shoes.repository;

//import com.poly.duanbangiay.entity.MauSac;
import com.example.datn404shoes.entity.MauSac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MauSacRepository extends JpaRepository<MauSac,Long> {
    boolean existsMauSacByTen(String name);

}
