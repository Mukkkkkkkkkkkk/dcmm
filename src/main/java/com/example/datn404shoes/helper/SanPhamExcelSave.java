package com.example.datn404shoes.helper;


import com.example.datn404shoes.entity.SanPham;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class SanPhamExcelSave {
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"Ten","SoLuong","GiaBan","GiaNhap","MoTa","TrangThai"};
    static String SHEET = "SanPham";

    public static boolean hasExcelFormat(MultipartFile file) {

        if (!TYPE.equals(file.getContentType())) {
            return false;
        }

        return true;
    }

    public static List<SanPham> excelToTutorials(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);

            Sheet sheet = workbook.getSheet(SHEET);
            Iterator<Row> rows = sheet.iterator();

            List<SanPham> tutorials = new ArrayList<>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();

                // skip header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }

                Iterator<Cell> cellsInRow = currentRow.iterator();

                SanPham tutorial = new SanPham();

                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();

                    switch (cellIdx) {

                        case 0:
                            tutorial.setTen(currentCell.getStringCellValue());
                            tutorial.setNgayTao(Date.valueOf(LocalDate.now()));
                            tutorial.setNgayCapNhat(Date.valueOf(LocalDate.now()));
                            break;

                        case 1:
//                            tutorial.setSoLuong((int) currentCell.getNumericCellValue());
                            break;

                        case 2:
//                            tutorial.setDonGia(currentCell.getNumericCellValue());
                            break;

                        case 3:
//                            tutorial.setDonGia(currentCell.getNumericCellValue());
                            break;

                        case 4:
                            tutorial.setMoTa(currentCell.getStringCellValue());
                            break;

                        case 5:
                            tutorial.setTrangThai((int) currentCell.getNumericCellValue());
                            break;

                        default:
                            break;
                    }

                    cellIdx++;
                }

                tutorials.add(tutorial);
            }

            workbook.close();
            return tutorials;
        } catch ( IOException e) {
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }
    }
}
