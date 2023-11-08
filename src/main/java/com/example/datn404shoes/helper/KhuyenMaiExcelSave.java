package com.example.datn404shoes.helper;

import com.example.datn404shoes.entity.KhuyenMai;
import com.example.datn404shoes.entity.KhuyenMai;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class KhuyenMaiExcelSave {
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"ten","moTa","batDau","ketThuc","giamGia","kieuKhuyenMai"};
    static String SHEET ="KhuyenMai";

    public static boolean hasExcelFormat(MultipartFile file){
        if(! TYPE.equals(file.getContentType())){
            return false;
        }
        return false;
    }
    public static List<KhuyenMai>excelImport(InputStream is){
        try {
            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheet(SHEET);
            Iterator<Row>rows = sheet.iterator();
            List<KhuyenMai>khuyenMaiLisst = new ArrayList<>();

            int rowNumber = 0;
            while (rows.hasNext()){
                Row currentRow = rows.next();
                if(rowNumber == 0){
                    rowNumber++;
                    continue;
                }
                Iterator<Cell>cellsInrow = currentRow.iterator();
                KhuyenMai km = new KhuyenMai();

                int cellIdx = 0;
                while (cellsInrow.hasNext()){
                    Cell currentCell = cellsInrow.next();
                    switch (cellIdx){
                        case 0:
                            km.setTen(currentCell.getStringCellValue());
                            break;
                        case 1:
                            km.setMoTa(currentCell.getStringCellValue());
                            break;
//                        case 2:
//                            km.setBatDau((Date) currentCell.getDateCellValue());
//                            break;
//                        case 3:
//                            km.setKetThuc((Date) currentCell.getDateCellValue());
//                            break;
                        case 4:
                            km.setGiamGia((float) currentCell.getNumericCellValue());
                            break;
                        case 5:
                            km.setKieuKhuyenMai((int) currentCell.getNumericCellValue());
                            break;
                        default:
                            break;
                    }
                    cellIdx++;
                }
                khuyenMaiLisst.add(km);
            }
            workbook.close();
            return khuyenMaiLisst;
        } catch (IOException e) {
            throw new RuntimeException("lỗi parse: "+e.getMessage());
        }
    }

}
