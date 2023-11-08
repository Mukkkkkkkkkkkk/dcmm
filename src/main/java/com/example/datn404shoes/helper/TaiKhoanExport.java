//package com.example.datn404shoes.helper;
//
////import com.poly.duanbangiay.entity.TaiKhoan;
//import com.example.datn404shoes.entity.TaiKhoan;
//import jakarta.servlet.ServletOutputStream;
//import jakarta.servlet.http.HttpServletResponse;
//import org.apache.poi.ss.usermodel.Cell;
//import org.apache.poi.ss.usermodel.CellStyle;
//import org.apache.poi.ss.usermodel.Row;
//import org.apache.poi.xssf.usermodel.XSSFFont;
//import org.apache.poi.xssf.usermodel.XSSFSheet;
//import org.apache.poi.xssf.usermodel.XSSFWorkbook;
//
//import java.io.IOException;
//import java.util.List;
//
//public class TaiKhoanExport {
//    private XSSFWorkbook workbook;
//    private XSSFSheet sheet;
//    private List<TaiKhoan> listUsers;
//
//    public TaiKhoanExport(List listUsers) {
//        this.listUsers = listUsers;
//        workbook = new XSSFWorkbook();
//    }
//
//
//
//
//    private void writeHeaderLine() {
//        sheet = workbook.createSheet("TaiKhoan");
//
//        Row row = sheet.createRow(0);
//
//        CellStyle style = workbook.createCellStyle();
//        XSSFFont font = workbook.createFont();
//        font.setBold(true);
//        font.setFontHeight(16);
//        style.setFont(font);
//
//        createCell(row, 0, "username", style);
//        createCell(row, 1, "email", style);
//        createCell(row, 2, "ten", style);
//        createCell(row, 3, "diaChi", style);
//        createCell(row, 4, "ngayTao", style);
//        createCell(row, 5, "ngayCapNhat", style);
//        createCell(row, 6, "password", style);
//        createCell(row, 7, "anh", style);
//        createCell(row, 8, "sdt", style);
//        createCell(row, 9, "trangThai", style);
//
//    }
//
//    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
//        sheet.autoSizeColumn(columnCount);
//        Cell cell = row.createCell(columnCount);
//        if (value instanceof Integer) {
//            cell.setCellValue((Integer) value);
//        } else if (value instanceof Boolean) {
//            cell.setCellValue((Boolean) value);
//        }else {
//            cell.setCellValue((String) value);
//        }
//        cell.setCellStyle(style);
//    }
//
//    private void writeDataLines() {
//        int rowCount = 1;
//
//        CellStyle style = workbook.createCellStyle();
//        XSSFFont font = workbook.createFont();
//        font.setFontHeight(14);
//        style.setFont(font);
//
//        for (TaiKhoan user : listUsers) {
//            Row row = sheet.createRow(rowCount++);
//            int columnCount = 0;
//
//            createCell(row, columnCount++,String.valueOf(user.getId()), style);
//            createCell(row, columnCount++, user.getTen(), style);
//            createCell(row, columnCount++, String.valueOf(user.getNgayTao()), style);
//            createCell(row, columnCount++, String.valueOf(user.getNgayCapNhat()), style);
//            createCell(row, columnCount++, user.getEmail(), style);
//            createCell(row, columnCount++, user.getDiaChi(), style);
//            createCell(row, columnCount++, user.getAnh(), style);
//            createCell(row, columnCount++, user.getPassword(), style);
//            createCell(row, columnCount++, user.getSdt(), style);
//            createCell(row, columnCount++, user.isTrangThai(), style);
//
//
//        }
//    }
//
//    public void export(HttpServletResponse response) throws IOException {
//        writeHeaderLine();
//        writeDataLines();
//
//        ServletOutputStream outputStream = response.getOutputStream();
//        workbook.write(outputStream);
//        workbook.close();
//
//        outputStream.close();
//
//    }
//}
