//package com.example.datn404shoes.helper;
//
//import com.example.datn404shoes.entity.TaiKhoan;
//import org.apache.poi.ss.usermodel.*;
//import org.apache.poi.xssf.usermodel.XSSFWorkbook;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.sql.Date;
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.Iterator;
//import java.util.List;
//
//public class TaiKhoanExcelSave {
//    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
//    static String[] HEADERs = {"Ten","DiaChi","NgayTao","NgayCapNhat","Anh","TrangThai"};
//    static String SHEET = "TaiKhoan";
//
//    public static boolean hasExcelFormat(MultipartFile file) {
//
//        if (!TYPE.equals(file.getContentType())) {
//            return false;
//        }
//
//        return true;
//    }
//
//    public static List<TaiKhoan> excelToTutorials(InputStream is) {
//        try {
//            Workbook workbook = new XSSFWorkbook(is);
//
//            Sheet sheet = workbook.getSheet(SHEET);
//            Iterator<Row> rows = sheet.iterator();
//
//            List<TaiKhoan> tutorials = new ArrayList<>();
//
//            int rowNumber = 0;
//            while (rows.hasNext()) {
//                Row currentRow = rows.next();
//
//                // skip header
//                if (rowNumber == 0) {
//                    rowNumber++;
//                    continue;
//                }
//
//                Iterator<Cell> cellsInRow = currentRow.iterator();
//
//                TaiKhoan tutorial = new TaiKhoan();
//
//                int cellIdx = 0;
//                while (cellsInRow.hasNext()) {
//                    Cell currentCell = cellsInRow.next();
//
//                    switch (cellIdx) {
//
//                        case 0:
//                            tutorial.setTen(currentCell.getStringCellValue());
//                            tutorial.setNgayTao(Date.valueOf(LocalDate.now()));
//                            tutorial.setNgayCapNhat(Date.valueOf(LocalDate.now()));
//                            break;
//
//                        case 1:
//                            tutorial.setDiaChi(currentCell.getStringCellValue());
//                            break;
//
//                        case 2:
//                            tutorial.setUsername(currentCell.getStringCellValue());
//                            break;
//
//                        case 3:
//                            tutorial.setEmail(currentCell.getStringCellValue());
//                            break;
//
//                        case 4:
//                            tutorial.setPassword(currentCell.getStringCellValue());
//                            break;
//
//                        case 5:
//                            tutorial.setAnh(currentCell.getStringCellValue());
//                            break;
//                        case 6:
//                            tutorial.setSdt(currentCell.getStringCellValue());
//                            break;
//                        case 7:
//                            tutorial.setTrangThai(currentCell.getBooleanCellValue());
//                            break;
//                        default:
//                            break;
//                    }
//
//                    cellIdx++;
//                }
//
//                tutorials.add(tutorial);
//            }
//
//            workbook.close();
//            return tutorials;
//        } catch ( IOException e) {
//            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
//        }
//    }
//}
