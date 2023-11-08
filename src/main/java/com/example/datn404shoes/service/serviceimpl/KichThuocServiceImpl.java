package com.example.datn404shoes.service.serviceimpl;


import com.example.datn404shoes.entity.KichThuoc;
import com.example.datn404shoes.entity.KichThuoc;
import com.example.datn404shoes.helper.KichThuocExcelSave;
import com.example.datn404shoes.repository.KichThuocRepository;
import com.example.datn404shoes.service.KichThuocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class KichThuocServiceImpl implements KichThuocService {

    @Autowired
    KichThuocRepository kichThuocRepository;

    @Override
    public KichThuoc add(KichThuoc kichThuoc) {
        kichThuocRepository.save(kichThuoc);
        return kichThuoc;
    }

    @Override
    public KichThuoc thayDoiTrangThai(Long id, KichThuoc kichThuoc) {
        KichThuoc kichThuoc1 = kichThuocRepository.findById(id).get();
        kichThuoc1.setGiaTri(kichThuoc.getGiaTri());
        kichThuoc1.setTrangThai(kichThuoc.getTrangThai());
        return kichThuocRepository.save(kichThuoc1);
    }

    @Override
    public void delete(Long id) {
        kichThuocRepository.deleteById(id);
    }

    @Override
    public KichThuoc update(KichThuoc kichThuoc, Long idKichThuoc) {
        KichThuoc kichThuoc1 = kichThuocRepository.findById(idKichThuoc).get();
        kichThuoc1.setGiaTri(kichThuoc.getGiaTri());
        kichThuoc1.setTrangThai(kichThuoc.getTrangThai());
        this.kichThuocRepository.save(kichThuoc1);
        return kichThuoc1;
    }

    @Override
    public KichThuoc detail(Long id) {
        return kichThuocRepository.findById(id).get();
    }

    @Override
    public KichThuoc findOne(Long id) {
        return kichThuocRepository.findById(id).get();
    }

    @Override
    public Page<KichThuoc> findAll(Pageable pageable) {
        return kichThuocRepository.findAll(pageable);
    }

    @Override
    public void imPortExcel(MultipartFile file) {
        try {
            List<KichThuoc> importEX = KichThuocExcelSave.excelImport(file.getInputStream());
            for (KichThuoc kichThuoc : importEX) {
                add(kichThuoc);
                kichThuoc.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("fail to store excel data: " + e.getMessage());
        }
        {

        }
    }

    @Override
    public boolean isKichThuocNameUnique(Integer name) {
        return kichThuocRepository.existsKichThuocByGiaTri(name);
    }
}
