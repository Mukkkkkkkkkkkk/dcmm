import React from 'react';
import Table from 'react-bootstrap/Table';

const OderList = () => {
    const fakeData = [];
    for (let i = 1; i <= 20; i++) {
        fakeData.push({
            id: i,
            ngayDatHang: '2023-08-0' + i,
            tongTien: Math.floor(Math.random() * 1000000), // Giá trị ngẫu nhiên từ 0 đến 999999
            trangThai: i % 2 === 0 ? 'Đã xác nhận' : 'Đang giao', // Lẻ: 'Đang giao', Chẵn: 'Đã xác nhận'
        });
    }
    return (
        <div className='container'>
            <div className='row my-5'>
                <h1>DANH SÁCH ĐƠN HÀNG</h1>
                <div className='col-8'>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ngày đặt hàng</th>
                                <th>tổng tiền</th>
                                <th>trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fakeData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.ngayDatHang}</td>
                                    <td>{item.tongTien}</td>
                                    <td>{item.trangThai}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className='col-4'>
                    <h1>
                        <strong>ĐƠN HÀNG</strong>
                    </h1>
                    <h6>
                        <i className='fa-solid fa-truck fs-6'></i> Giao Hàng Nhanh
                    </h6>
                    <h6>
                        <i className='fa-solid fa-barcode fs-6'></i> Mã đơn : 89979976880
                    </h6>
                    <hr />

                    {/* Progress Bar */}
                    <div className='position-relative m-5'>
                        <div
                            className='progress'
                            role='progressbar'
                            aria-label='Progress'
                            aria-valuenow='50'
                            aria-valuemin='0'
                            aria-valuemax='100'
                            style={{ height: '1px' }}
                        >
                            <div className='progress-bar w-50'></div>
                        </div>
                        <button
                            type='button'
                            className='position-absolute top-0 start-0 translate-middle btn btn-sm btn-success rounded-pill'
                            style={{ width: '2rem', height: '2rem' }}
                            title='đã xác nhận'
                        >
                            <i className='fa-solid fa-box'></i>
                        </button>
                        <button
                            type='button'
                            className='position-absolute top-0 start-50 translate-middle btn btn-sm btn-success rounded-pill'
                            style={{ width: '2rem', height: '2rem' }}
                            title='đang giao'
                        >
                            <i className='fa-solid fa-truck'></i>
                        </button>
                        <button
                            type='button'
                            className='position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill'
                            style={{ width: '2rem', height: '2rem' }}
                            title='đã nhận hàng'
                        >
                            <i className='fa-solid fa-check'></i>
                        </button>
                    </div>

                    {/* Order Details */}
                    <div className='row mb-4 border py-2'>
                        <div className='col-8'>
                            <h5>
                                <strong>tên sản phẩm + Màu</strong>
                            </h5>
                            <span>Size: 34</span>
                            <span className='float-end'>Số lượng: 4</span>
                        </div>
                        <div className='col-4'>
                            <p></p>
                            <h6 className='float-end'>99.999</h6>
                        </div>
                    </div>

                    {/* ... Repeat more order details ... */}

                    {/* Total Price */}
                    <hr className='dashed-hr' />
                    <div className='row'>
                        <div className='col-6'>
                            {' '}
                            <span>Đơn hàng :</span>
                        </div>
                        <div className='col-6'>
                            {' '}
                            <span className='float-end'>100.333.213 VND</span>
                        </div>
                        <div className='col-6'>
                            {' '}
                            <span>Giảm :</span>
                        </div>
                        <div className='col-6'>
                            {' '}
                            <span className='float-end'>900.000</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4'>
                            <br />
                            <h5>
                                <strong style={{ color: 'orangered' }}>TỔNG CỘNG: </strong>
                            </h5>
                        </div>
                        <div className='col-8 '>
                            <br />
                            <h5>
                                <strong className='float-end' style={{ color: 'orangered' }}>
                                    124.121.000 VND
                                </strong>
                            </h5>
                        </div>
                    </div>
                    <hr className='dashed-hr' />
                    <a href='/track' className='btn btn-outline-dark w-100'>đã nhận được hàng </a>
                    <hr className='dashed-hr' />
                </div>
            </div>
        </div>
    );
};

export default OderList;
