// TichDiemComponent.js

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { tichDiemDaCoTaiKhoan, tichDiemMoi } from './TichDiemService';

const TichDiemComponent = () => {
    const [sdt, setSdt] = useState('');
    const [diem, setDiem] = useState('');
    const [result, setResult] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleTimTaiKhoan = async () => {
        // Code xử lý tìm kiếm tài khoản theo số điện thoại
        // Gọi API hoặc thực hiện tìm kiếm tại đây và cập nhật tài khoản ID
    };

    const handleTichDiemDaCoTaiKhoan = async () => {
        const message = await tichDiemDaCoTaiKhoan(sdt, diem);
        setResult(message);
    };

    const handleTichDiemMoi = async () => {
        const message = await tichDiemMoi(sdt, diem);
        setResult(message);
    };

    const popupContent = (
        <div className="popup">
            <h2>Nhập thông tin tích điểm</h2>
            <div>
                <label>Số điện thoại:</label>
                <input type="text" value={sdt} onChange={(e) => setSdt(e.target.value)} />
            </div>
            <div>
                <label>Điểm:</label>
                <input type="text" value={diem} onChange={(e) => setDiem(e.target.value)} />
            </div>
            <div>
                <button onClick={handleTichDiemDaCoTaiKhoan}>Tích Điểm Đã Có Tài Khoản</button>
                <button onClick={handleTichDiemMoi}>Tích Điểm Mới</button>
                <button onClick={handleCloseModal}>Đóng</button>
            </div>
            <div>
                <p>{result}</p>
            </div>
        </div>
    );

    return (
        <div>
            <h2>Tích Điểm</h2>
            <div>
                <label>Nhập Số Điện Thoại:</label>
                <input type="text" value={sdt} onChange={(e) => setSdt(e.target.value)} />
                <button onClick={handleTimTaiKhoan}>Tìm Tài Khoản</button>
            </div>
            <Button variant="primary" onClick={handleShowModal}>
                Mở Popup
            </Button>

            <Modal show={showModal} onHide={handleCloseModal} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Nhập thông tin tích điểm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {popupContent}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default TichDiemComponent;
