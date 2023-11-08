package com.example.datn404shoes.repository;

//import com.poly.duanbangiay.entity.ThuongHieu;
import com.example.datn404shoes.entity.ThuongHieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThuongHieuRepository extends JpaRepository<ThuongHieu,Long> {
    boolean existsThuongHieuByTen(String name);

}
