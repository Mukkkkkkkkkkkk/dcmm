// TichDiemService.js

export async function tichDiemDaCoTaiKhoan(sdt, diem) {
    try {
        const response = await fetch(`http://localhost:8080/api/tichdiem/dacotaikhoan?sdt=${sdt}&diem=${diem}`, {
            method: 'POST',
        });

        if (response.ok) {
            return 'Tích điểm thành công';
        } else if (response.status === 400) {
            return 'Tài khoản không tồn tại';
        } else {
            return 'Tích điểm không thành công';
        }
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu:', error);
        return 'Lỗi khi gửi yêu cầu';
    }
}

export async function tichDiemMoi(sdt, diem) {
    try {
        const response = await fetch(`http://localhost:8080/api/tichdiem/moi?sdt=${sdt}&diem=${diem}`, {
            method: 'POST',
        });

        if (response.ok) {
            return 'Tích điểm thành công';
        } else if (response.status === 400) {
            return 'Tài khoản này đã có thông tin tích điểm';
        } else {
            return 'Tích điểm không thành công';
        }
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu:', error);
        return 'Lỗi khi gửi yêu cầu';
    }
}
