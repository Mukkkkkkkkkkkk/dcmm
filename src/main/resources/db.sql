
drop database ShopShoe
go
create database ShopShoe
go
use ShopShoe
go



select * from san_pham

-- Create thong_tin_nguoi_dung table
CREATE TABLE thong_tin_nguoi_dung (
                                      id BIGINT PRIMARY KEY IDENTITY(1,1),
                                      ngay_sinh DATE NOT NULL,
                                      sdt NVARCHAR(255) NOT NULL,
                                      ten NVARCHAR(255) NOT NULL,
                                      cccd nvarchar(12),
                                      gioi_tinh int  not null,
                                      ngay_cap_nhat DATETIME,);


--thêm bảng địa chỉ giao hàng
CREATE TABLE dia_chi (
                         id BIGINT PRIMARY KEY IDENTITY(1,1),
                         ten NVARCHAR(255) NOT NULL,
                         so_dien_thoai NVARCHAR(10)NOT NULL,
                         dia_chi_cu_the NVARCHAR(255) NOT NULL,
                         tinh_thanh_pho NVARCHAR(255) NOT NULL,
                         quan_huyen NVARCHAR(255) NOT NULL,
                         xa_phuong_thi_tran nvarchar(255)NOT NULL,
                         ngay_cap_nhat DATETIME,
                         thong_tin_nguoi_dung_id BIGINT,
                         trang_thai BIT NOT NULL,
                         FOREIGN KEY (thong_tin_nguoi_dung_id) REFERENCES thong_tin_nguoi_dung(id)
);


CREATE TABLE tai_khoan (
                           id BIGINT PRIMARY KEY IDENTITY(1,1),
                           ma_tai_khoan nvarchar(255) NOT NULL,
                           email NVARCHAR(255) NOT NULL,--bỏ username
                           ngay_tao DATETIME,
                           ngay_cap_nhat DATETIME,
                           password NVARCHAR(255) NOT NULL,
                           anh NVARCHAR(255),
                           trang_thai BIT NOT NULL,
                           thong_tin_nguoi_dung_id BIGINT,
                           FOREIGN KEY (thong_tin_nguoi_dung_id) REFERENCES thong_tin_nguoi_dung(id)
);
-- Create vai_tro table
CREATE TABLE quyen (
                       id BIGINT PRIMARY KEY IDENTITY(1,1),
                       ten NVARCHAR(255) NOT NULL,
                       trang_thai BIT NOT NULL
);
-- Create phan_quyen table
CREATE TABLE phan_quyen (
                            id BIGINT PRIMARY KEY IDENTITY(1,1),
                            tai_khoan_id BIGINT,
                            quyen_id BIGINT,
                            FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan(id),
                            FOREIGN KEY (quyen_id) REFERENCES quyen(id)
);



-- Create kich_thuoc table
CREATE TABLE kich_thuoc (
                            id BIGINT PRIMARY KEY IDENTITY(1,1),
                            gia_tri INT NOT NULL,
                            trang_thai BIT NOT NULL
);

-- Create danh_muc table
CREATE TABLE danh_muc (
                          id BIGINT PRIMARY KEY IDENTITY(1,1),
                          ten NVARCHAR(255) NOT NULL,
                          trang_thai BIT NOT NULL
);

-- Create kich_thuocmau_sacchi_tiet table


-- Create mau_sac table
CREATE TABLE mau_sac (
                         id BIGINT PRIMARY KEY IDENTITY(1,1),
                         ten NVARCHAR(255) NOT NULL,
                         trang_thai BIT NOT NULL
);


-- Create thanh_toan table
CREATE TABLE thanh_toan (
                            id BIGINT PRIMARY KEY IDENTITY(1,1),
                            ten NVARCHAR(255) NOT NULL,
                            trang_thai INT NOT NULL
);

-- Create thuong_hieu table
CREATE TABLE thuong_hieu (
                             id BIGINT PRIMARY KEY IDENTITY(1,1),
                             ten NVARCHAR(255) NOT NULL,
                             trang_thai BIT NOT NULL
);

CREATE Table xuat_xu(
                        id BIGINT PRIMARY Key IDENTITY(1,1),
                        ten NVARCHAR(255)NOT NULL,
                        trang_thai INT NOT NULL
);


-- Create san_pham table
CREATE TABLE san_pham (
                          id BIGINT PRIMARY KEY IDENTITY(1,1),
                          ma_san_pham nvarchar(255) NOT NULL,
                          ngay_tao DATE NOT NULL,
                          ten NVARCHAR(255) NOT NULL,
                          trang_thai INT NOT NULL,--bỏ đơn giá
                          ngay_cap_nhat DATETIME,
                          mo_ta NVARCHAR(255) NOT NULL,
                          thuong_hieu bigInt not null,
                          xuat_xu bigint not null,
                          danh_muc bigint not null,
                          anh_bia nvarchar(255),
                          FOREIGN KEY (thuong_hieu) REFERENCES thuong_hieu(id),
                          FOREIGN KEY (xuat_xu) REFERENCES xuat_xu(id),
                          FOREIGN KEY (danh_muc) REFERENCES danh_muc(id)
);



CREATE TABLE san_pham_chi_tiet (
                                   id BIGINT PRIMARY KEY IDENTITY(1,1),
                                   ngay_tao DATE NOT NULL,
                                   ngay_cap_nhat DATETIME,
                                   trang_thai INT NOT NULL,
                                   so_luong INT Not Null,
                                   don_gia float NOT NULL, --sửa cái này
                                   kich_thuoc BIGINT,
                                   mau_sac BIGINT,
                                   san_pham_id BIGINT,
                                   anh nvarchar(255),
    --thêm qr code
                                   FOREIGN KEY (kich_thuoc) REFERENCES kich_thuoc(id),
                                   FOREIGN KEY (mau_sac) REFERENCES mau_sac(id),
                                   FOREIGN KEY (san_pham_id) REFERENCES san_pham(id)
);

CREATE TABLE khuyen_mai (
                            id BIGINT PRIMARY KEY IDENTITY(1,1),
                            ma nvarchar(225) not null,
                            ten NVARCHAR(255) NOT NULL,
                            mo_ta NVARCHAR(255),
                            bat_dau DATETIME NOT NULL,
                            ket_thuc DATETIME NOT NULL,
                            giam_gia FLOAT NOT NULL,
                            kieu_khuyen_mai INT NOT NULL,
                            dieu_kien float not null,
                            so_luong int not null,
                            trang_thai int not null
);
--hoa don
CREATE TABLE hoa_don (
                         id BIGINT PRIMARY KEY IDENTITY(1,1),
                         ma_hoa_don NVARCHAR(255) NOT NULL,
                         ngay_tao DATE NOT NULL,
                         ghi_chu NVARCHAR(255),
                         ngay_cap_nhat DATETIME,
                         trang_thai INT NOT NULL,
                         tai_khoan_id BIGINT,
                         thanh_toan_id BIGINT,
                         kieu_hoa_don INT NOT NULL,
                         tong_tien FLOAT NOT NULL,
                         phi_ship FLOAT,
                         tien_giam FLOAT,
                         tong_tien_sau_giam FLOAT,
                         ten NVARCHAR(255) NOT NULL,
                         sdt NVARCHAR(11),
                         email NVARCHAR(255),
    --sửa 3 trường sau cho đồng nhất
                         dia_chi_cu_the NVARCHAR(255),
                         tinh_thanh_pho NVARCHAR(255),
                         quan_huyen NVARCHAR(255),
                         xa_phuong_thi_tran nvarchar(255),
    -------------------------------------------
                         FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan(id),
                         FOREIGN KEY (thanh_toan_id) REFERENCES thanh_toan(id)
);
select * from thong_tin_nguoi_dung
CREATE TABLE gio_hang (
                          id BIGINT PRIMARY KEY IDENTITY(1,1),
                          ngay_tao DATE NOT NULL,
                          ghi_chu NVARCHAR(255) NOT NULL,
                          ngay_cap_nhat DATETIME,
                          tong_tien FLOAT,
                          trang_thai INT NOT NULL,
                          tai_khoan_id BIGINT,
                          FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan(id),

);
-- Create hoa_donchi_tiet table
CREATE TABLE hoa_don_chi_tiet (
                                  id BIGINT PRIMARY KEY IDENTITY(1,1),
                                  ghi_chu NVARCHAR(255),
                                  so_luong INT NOT NULL,
                                  hoa_don_id BIGINT,
                                  san_pham_chi_tiet_id BIGINT,
                                  FOREIGN KEY (hoa_don_id) REFERENCES hoa_don(id),
                                  FOREIGN KEY (san_pham_chi_tiet_id) REFERENCES san_pham_chi_tiet(id)

);



-- Create san_pham_anh table
CREATE TABLE san_pham_anh (
                              id BIGINT PRIMARY KEY IDENTITY(1,1),
                              san_pham_id BIGINT,
                              anh NVARCHAR(255),
                              FOREIGN KEY (san_pham_id) REFERENCES san_pham(id)
);
-- Create gio_hang table
CREATE TABLE gio_hang_chi_tiet (
                                   id BIGINT PRIMARY KEY IDENTITY(1,1),
                                   gio_hang_id BIGINT,
                                   san_pham_chi_tiet_id BIGINT,
                                   so_luong INT NOT NULL,

                                   FOREIGN KEY (gio_hang_id) REFERENCES gio_hang(id),
                                   FOREIGN KEY (san_pham_chi_tiet_id) REFERENCES san_pham_chi_tiet(id)
);



CREATE TABLE lich_su_hoa_don(
                                id BIGINT PRIMARY KEY IDENTITY(1,1),
                                ma_hoa_don BIGINT,
                                san_pham_chi_tiet BIGINT,
                                phuong_thuc_thanh_toan BIGINT,
                                nguoi_nhan BIGINT,
                                khuyen_mai BIGINT,
                                ngay_tao_hoa_don DATE NOT NULL,
                                tong_tien FLOAT NOT NULL,
                                dia_chi_giao NVARCHAR(255) ,
                                ghi_chu NVARCHAR(255),
                                trang_thai_hoa_don INT
                                    FOREIGN KEY (ma_hoa_don) REFERENCES hoa_don(id),
                                FOREIGN KEY (san_pham_chi_tiet) REFERENCES san_pham_chi_tiet(id),
                                FOREIGN KEY (phuong_thuc_thanh_toan) REFERENCES thanh_toan(id),
                                FOREIGN KEY (nguoi_nhan) REFERENCES tai_khoan(id),
                                FOREIGN KEY (khuyen_mai) REFERENCES khuyen_mai(id)
);
use ShopShoe

    INSERT INTO thong_tin_nguoi_dung ( ngay_sinh, sdt, ten,cccd,gioi_tinh, ngay_cap_nhat)
VALUES
    ( '1990-01-01', '0987654321', N'Trần Đăng','009876000765',1, GETDATE() ),
     ('1990-02-02', '0987654321', N'Bùi Hùng','098786788765',1, GETDATE()),
    ( '1990-03-03', '0987654321', N'Minh Quân','008675000223',1, GETDATE()),
    ( '1990-04-04', '0987654321', N'Xuân Thiệu','009034055123',1, GETDATE()),
    ( '1990-05-05', '0987654321', N'Xuân Mai','006756777867',2, GETDATE());



INSERT INTO [dbo].[xuat_xu]
([ten],[trang_thai])
VALUES
    (N'Trung quốc',1),
    (N'Việt Nam',1),
    (N'Mỹ',1),
    (N'Pháp',1),
    (N'Nhật',1);


INSERT INTO quyen (ten, trang_thai)
VALUES
(N'Nhân Viên', 1),
(N'Quản Lý', 1),
(N'Khách Hàng', 1)

    INSERT INTO tai_khoan (ma_tai_khoan, email, ngay_tao, ngay_cap_nhat, password, anh, trang_thai, thong_tin_nguoi_dung_id)
VALUES
    ('NV2' ,'quanluc123@gmail.com', GETDATE(), GETDATE(), '0987654321', 'anh1.jpg',1,1),
    ('NV1' , 'thieu456@gmail.com',  GETDATE(), GETDATE(), '0987654321', 'anh2.jpg',1,2),
    ('NV4' , 'hungbt99@gmail.com' , GETDATE(), GETDATE(), '0987654321', 'anh3.jpg',1,3),
    ('NV5' , 'dang3389@gmail.com', GETDATE(), GETDATE(), '0987654321', 'anh4.jpg',1, 4),
    ('NV5' , 'dang78yu@gmail.com', GETDATE(), GETDATE(), '0987654321', 'anh5.jpg',1,5);



INSERT INTO phan_quyen (tai_khoan_id, quyen_id)
VALUES
(5, 1),
(2, 2),
(3, 3),
(4, 2)


    INSERT INTO danh_muc (ten, trang_thai)
VALUES
    (N'Giày Chạy Bộ', 1),
    (N'Giày Nhảy Dây', 1),
    (N'Giày Bóng Rổ', 1),
    (N'Giày Đá Bóng', 1),
    (N'Giày Đánh Cầu', 1),
    (N'Giày Bóng Chuyền', 1),
    (N'Giày Tập Gym', 1);


INSERT INTO mau_sac (ten, trang_thai)
VALUES
(N'Trắng', 1),
(N'Xanh Đen', 1),
( N'Hồng Đen', 1),
( N'Đỏ Trắng', 1),
(N'Xanh Lam', 1),
(N'Đỏ Đen', 1),
( N'Tím Đen', 1),
( N'Vàng Trắng', 1),
(N'Hồng Lam', 1),
(N'Ngọc Bích', 1),
( N'Pha Lê', 1),
( N'Nâu', 1),
(N'Galaxy', 1),
(N'Xám Khói', 1),
( N'Trắng Đen', 1),
( N'Đỏ Tươi', 1),
(N'Lục Lam', 1),
( N'Vàng', 1);
INSERT INTO kich_thuoc (gia_tri, trang_thai)
VALUES
(36, 1),
(37, 1),
(38, 1),
(39, 1),
(40, 1),
(41, 1),
(42, 1),
(43, 1)


    INSERT INTO thuong_hieu (ten, trang_thai)
VALUES
    ('Nike', 1),
    ('Adidas', 1),
    ('Puma', 1),
    ('New Balance', 1),
    ('Skechers', 1),
    ('Reebok', 1),
    ('Asic', 1),
    ('Converse', 1);

INSERT INTO thanh_toan (ten, trang_thai)
VALUES
(N'Thanh toán online', 1),
(N'Thanh toán khi nhận hàng', 1),
(N'Thanh toán VNPay', 1);



INSERT INTO dia_chi(ten, so_dien_thoai, dia_chi_cu_the, tinh_thanh_pho, quan_huyen, xa_phuong_thi_tran,ngay_cap_nhat,thong_tin_nguoi_dung_id,trang_thai)
VALUES
( N'Ma Văn Quang', '0967565467', N'SỐ 22', N'Hà Nội',N'Cầu Giấy',N'Xuân Thủy',GETDATE(),1,1),
( N'Nguyễn Thị Bích', '0887656545', N'SỐ 33', N'Hà Nội', N'Đống Đa',N'Xuân Thủy',GETDATE(),1,1),
( N'Tô GIang', '0887556745', N'SỐ 22',  N'Hà Nội',N'Cầu Giấy',N'Xuân Thủy',GETDATE(),2,1),
( N'Xuân Thu', '0887656545', N'SỐ 33',  N'Đống Đa',N'Đống Đa',N'Xuân Thủy',GETDATE(),2,1)






    INSERT INTO san_pham (ma_san_pham,ngay_tao, ten, trang_thai, ngay_cap_nhat, mo_ta,thuong_hieu,xuat_xu,danh_muc,anh_bia)
VALUES
    ('SP001',GETDATE(), N'Giày Thể Thao Nam Adidas Mens Courtphase Trainers', 1, GETDATE(), N'Sản phẩm tốt',2,2,3,'anh1.jpg'),
    ('SP002',GETDATE(), N'Giày Thể Thao Adidas Stan Smith Shoes', 1, GETDATE(), N'Sản phẩm tốt',2,2,1,'anh1.jpg'),
    ('SP003',GETDATE(), N'Giày Thể Thao Nike Air Force 1 High Green White', 1, GETDATE(), N'Sản phẩm tốt',1,3,1,'anh1.jpg')





INSERT INTO san_pham_chi_tiet (so_luong, don_gia, ngay_tao, ngay_cap_nhat, trang_thai,kich_thuoc,mau_sac,san_pham_id,anh)
VALUES
    (100,1800000, GETDATE(), GETDATE(), 1,2,3,1,'anh5.jpg'),
    (20,2600000, GETDATE(), GETDATE(), 1,4,3,1,'anh5.jpg'),
    (40,3200000, GETDATE(), GETDATE(), 1,3,6,1,'anh5.jpg'),
    (20,3200000, GETDATE(), GETDATE(), 1,3,3,1,'anh5.jpg'),
    (30,3200000, GETDATE(), GETDATE(), 1,4,2,1,'anh5.jpg')



INSERT INTO san_pham_anh (san_pham_id, anh)
VALUES
    (1, 'anh1.jpg'),
    (2, 'anh2.jpg'),
    (1, 'anh3.jpg'),
    (3, 'anh4.jpg'),
    (2, 'anh5.jpg');



INSERT INTO hoa_don (ma_hoa_don,ngay_tao, ghi_chu, ngay_cap_nhat, trang_thai, tai_khoan_id, thanh_toan_id,kieu_hoa_don,tong_tien,phi_ship,tien_giam,tong_tien_sau_giam,ten,sdt,email,dia_chi_cu_the,tinh_thanh_pho,quan_huyen,xa_phuong_thi_tran)
VALUES
('HD001',GETDATE(), N'Khách hàng yêu cầu bọc', GETDATE(), 1, 2, 2,1,0,20000,30000,10000,N'Lương Văn Mai','0362460679','thieutttt01@gmail.com',N'Hà Nội',N'Đông Anh',N'Vân NộI',N'Vân NộI'),
('HD002',GETDATE(), N'Không', GETDATE(), 1, 3, 2,1,0,20000,30000,10000,N'Lương Văn Kiều','0362460679','maibl@gmail.com',N'Hà Nội',N'Đông Anh',N'Vân NộI',N'Vân NộI'),
('HD003',GETDATE(), N'Giao hỏa tốc', GETDATE(), 1, 4, 2,1,0,20000,30000,10000,N'Nông Thị Mai','0362460679','kieummm@gmail.com',N'Hà Nội',N'Đông Anh',N'Vân NộI',N'Vân NộI')


    INSERT INTO gio_hang (ngay_tao, ghi_chu, ngay_cap_nhat, trang_thai, tai_khoan_id,tong_tien)
VALUES
    (GETDATE(), N'Giỏ hàng của khách', GETDATE(), 1, 2,0),
    (GETDATE(), N'Giỏ hàng của khách', GETDATE(), 1, 3,0),
    (GETDATE(), N'Giỏ hàng của khách', GETDATE(), 1, 4,0),
    (GETDATE(), N'Giỏ hàng của khách', GETDATE(), 1, 5,0);




INSERT INTO hoa_don_chi_tiet (ghi_chu, so_luong, hoa_don_id, san_pham_chi_tiet_id)
VALUES
(N'Tốt', 2, 1, 1),
(N'Tốt', 3, 2, 2),
(N'Tốt', 4, 3, 1)





    INSERT INTO hoa_don_chi_tiet (ghi_chu, so_luong, hoa_don_id, san_pham_chi_tiet_id)
VALUES
    (N'Ghi chú 1', 2, 1, 1),
    (N'Ghi chú 2', 3, 2, 2)




INSERT INTO gio_hang_chi_tiet (gio_hang_id, san_pham_chi_tiet_id, so_luong)
VALUES
    (1, 2, 3),
    (3, 3, 4)


INSERT INTO [dbo].[khuyen_mai]
(ma,[ten],[mo_ta],[bat_dau],[ket_thuc],[giam_gia],[kieu_khuyen_mai],dieu_kien,so_luong,trang_thai)
VALUES
    ('KHUYENMAICHAOMUNG',N'KHUYẾN MÃI CHÀO MỪNG NGƯỜI MỚI',N'GIẢM 50K VỚI THÀNH VIÊN MỚI',GETDATE(),GETDATE(),10 ,1,50000,20,1),
    ('KHUYENMAIPK',N'KHUYẾN MÃI TƯNG BỪNG',N'GIẢM 10K KHI MUA SẢN PHẨM TRÊN 10K',GETDATE(),GETDATE(),10000 ,0,10000,20,1),
    ('KHUYENMAITHANG10',N'KHUYẾN MÃI THÁNG 10',N'GIẢM 10K KHI MUA SẢN PHẨM TRÊN 15K',GETDATE(),GETDATE(),15000 ,1,100000,20,1),
    ('KHUYENMAIDEMDONG',N'ĐÔNG KHUYẾN MÃI',N'GIẢM 80K KHI MUA SẢN PHẨM TRÊN 800K',GETDATE(),GETDATE(),10000 ,1,800000,20,1),
    ('KHUYENMAIBLACKDAY',N'KHUYẾN MÃI NGÀY ĐEN',N'GIẢM 10K KHI MUA SẢN PHẨM TRÊN 10K',GETDATE(),GETDATE(),10 ,1,0,20,1);


INSERT INTO [dbo].[lich_su_hoa_don]
([ma_hoa_don],[san_pham_chi_tiet],[phuong_thuc_thanh_toan],[nguoi_nhan],[khuyen_mai],[ngay_tao_hoa_don],[tong_tien],[dia_chi_giao],[ghi_chu],[trang_thai_hoa_don])
VALUES
    (1,1,1,3,1,'2023/10/5',0,N'Hà Nội',N'Không',1),
    (2,2,2,4,2,'2023/10/5',0,N'Hà Nội',N'Không',1),
    (3,2,2,5,2,'2023/10/5',0,N'Hà Nội',N'Không',1)



select * from danh_muc
select * from gio_hang
select * from gio_hang_chi_tiet
select * from hoa_don
select * from hoa_don_chi_tiet
select * from khuyen_mai
select * from kich_thuoc
select * from lich_su_hoa_don
select * from mau_sac
select * from phan_quyen
select * from quyen
select * from san_pham
select * from san_pham_anh
select * from tai_khoan
select * from thanh_toan
select * from thong_tin_nguoi_dung
select * from thuong_hieu
select * from xuat_xu
select * from dia_chi

