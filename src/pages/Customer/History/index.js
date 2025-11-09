// File: src/pages/Customer/History/index.js 

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./History.css";

const initialBookings = [
    { id: 1, code: 'A123B', podName: 'POD Đơn A1', time: '08:00 - 10:00, 07/09/2025', status: 'Đã hoàn thành' },
    { id: 2, code: 'C456D', podName: 'POD Nhóm B2', time: '14:00 - 15:00, 06/09/2025', status: 'Đã hủy' },
    { id: 3, code: 'E789F', podName: 'POD Đơn G1', time: '09:00 - 12:00, 05/09/2025', status: 'Sắp tới' },
];

function HistoryPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(initialBookings);


  return (
    <div className="history-page">

      <div className="header-bar"></div>

      <main className="history-content">

        <div className="content-header">
            <h2 className="title">LỊCH SỬ ĐẶT CHỖ</h2>
            <div className="actions">
                <button className="btn-home" onClick={() => navigate("/dashboard")}>
                    Trang chủ
                </button>
                <button className="btn-book" onClick={() => navigate("/dashboard")}>
                    Đặt phòng mới
                </button>
            </div>
        </div>


        <table className="history-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã Đặt Chỗ</th>
              <th>Phòng</th>
              <th>Thời Gian</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
                <tr key={booking.id}>
                    <td>{index + 1}</td>
                    <td>{booking.code}</td>
                    <td>{booking.podName}</td>
                    <td>{booking.time}</td>
                    <td>{booking.status}</td>
                </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button>1</button>
          <button>2</button>
          <span>...</span>
          <button>10</button>
          <button>next →</button>
        </div>
      </main>
    </div>
  );
}

export default HistoryPage;
