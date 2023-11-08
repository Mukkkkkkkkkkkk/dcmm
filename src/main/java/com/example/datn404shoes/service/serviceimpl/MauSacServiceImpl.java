package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.MauSac;
//import com.example.datn404shoes.helper.MauSacExcelSave;
import com.example.datn404shoes.repository.MauSacRepository;
import com.example.datn404shoes.service.MauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class MauSacServiceImpl implements MauSacService {

    @Autowired
    MauSacRepository mauSacRepository;

    @Override
    public MauSac add(MauSac mauSac) {
        mauSacRepository.save(mauSac);
        return mauSac;
    }

    @Override
    public void delete(Long id) {
        mauSacRepository.deleteById(id);
    }

    @Override
    public MauSac thayDoiTrangThai(Long id, MauSac mauSac) {
        MauSac mauSac1 = mauSacRepository.findById(id).get();
        mauSac1.setTen(mauSac.getTen());
        mauSac1.setTrangThai(mauSac.getTrangThai());
        return mauSacRepository.save(mauSac1);
    }

    @Override
    public MauSac update(Long idud, MauSac mauSac) {
        MauSac mauSac1 = mauSacRepository.findById(idud).get();
//        mauSac1.setGiaTri(mauSac.getGiaTri());
        mauSac1.setTen(mauSac.getTen());
        mauSac1.setTrangThai(mauSac.getTrangThai());
        this.mauSacRepository.save(mauSac1);
        return mauSac1;
    }

    @Override
    public MauSac detail(Long id) {
        return mauSacRepository.findById(id).get();
    }

    @Override
    public MauSac findOne(Long id) {
        return mauSacRepository.findById(id).get();
    }

    @Override
    public Page<MauSac> findAll(Pageable pageable) {
        return mauSacRepository.findAll(pageable);
    }

    @Override
    public void imPortExcel(MultipartFile file) {
//        try {
//            List<MauSac> importEX = MauSacExcelSave.excelImport(file.getInputStream());
//            for (MauSac mauSac : importEX) {
//                add(mauSac);
//                mauSac.toString();
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//            throw new RuntimeException("fail to store excel data: " + e.getMessage());
//        }
//        {
//
//        }
    }

    @Override
    public boolean isMauSacNameUnique(String name) {
        return mauSacRepository.existsMauSacByTen(name);
    }
}
