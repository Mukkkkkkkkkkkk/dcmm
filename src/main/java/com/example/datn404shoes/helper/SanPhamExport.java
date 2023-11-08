package com.example.datn404shoes.helper;


import com.example.datn404shoes.entity.SanPham;
//import com.poly.duanbangiay.entity.SanPham;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.util.List;

public class SanPhamExport {
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private List<SanPham> listUsers;

    public SanPhamExport(List listUsers) {
        this.listUsers = listUsers;
        workbook = new XSSFWorkbook();
    }


    private void writeHeaderLine() {
        sheet = workbook.createSheet("ChucVu");

        Row row = sheet.createRow(0);

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);

        createCell(row, 0, "Id", style);
        createCell(row, 1, "Ten", style);
        createCell(row, 2, "NgayTao", style);
        createCell(row, 3, "NgayCapNhat", style);
        createCell(row, 4, "SoLuong", style);
        createCell(row, 5, "GiaBan", style);
        createCell(row, 6, "GiaNhap", style);
        createCell(row, 7, "MoTa", style);
        createCell(row, 8, "TrangThai", style);

    }

    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        }else {
            cell.setCellValue((String) value);
        }
        cell.setCellStyle(style);
    }

    private void writeDataLines() {
        int rowCount = 1;

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);

        for (SanPham user : listUsers) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;

            createCell(row, columnCount++,String.valueOf(user.getId()), style);
            createCell(row, columnCount++, user.getTen(), style);
            createCell(row, columnCount++, String.valueOf(user.getNgayTao()), style);
            createCell(row, columnCount++, String.valueOf(user.getNgayCapNhat()), style);
//            createCell(row, columnCount++, user.getSoLuong(), style);
            createCell(row, columnCount++, user.getMoTa(), style);
            createCell(row, columnCount++, user.getTrangThai(), style);


        }
    }

    public void export(HttpServletResponse response) throws IOException {
        writeHeaderLine();
        writeDataLines();

        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();

        outputStream.close();

    }
}
