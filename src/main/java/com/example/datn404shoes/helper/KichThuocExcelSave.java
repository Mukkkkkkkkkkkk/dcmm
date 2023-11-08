package com.example.datn404shoes.helper;

import com.example.datn404shoes.entity.KichThuoc;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class KichThuocExcelSave {
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"GiaTri","TrangThai"};
    static String SHEET = "KichThuoc";

    public static boolean hasExcelFormat(MultipartFile file) {
        if (!TYPE.equals(file.getContentType())) {
            return false;
        }
        return true;
    }

    public static List<KichThuoc> excelImport(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheet(SHEET);
            Iterator<Row> rows = sheet.iterator();
            List<KichThuoc> kichThuocList = new ArrayList<>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();

                //bỏ qua header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }
                Iterator<Cell> cellsInRow = currentRow.iterator();
                KichThuoc kichThuoc = new KichThuoc();

                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();
                    switch (cellIdx) {
                        case 0:
                            kichThuoc.setGiaTri((int) currentCell.getNumericCellValue());
                            break;
                        case 1:
                            kichThuoc.setTrangThai((int) currentCell.getNumericCellValue());
                            break;
                        default:
                            break;
                    }
                    cellIdx++;
                }
                kichThuocList.add(kichThuoc);
            }
            workbook.close();
            return kichThuocList;
        } catch (IOException e) {
            throw new RuntimeException("lỗi parse: " + e.getMessage());
        }
    }
}
