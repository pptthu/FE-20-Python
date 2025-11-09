import React from "react";
import { useNavigate } from "react-router-dom";
import "./Success.css";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">
        <img
          src="/logo.png" 
          alt="POD Booking System"
          className="success-logo"
        />
        <h2 className="success-title">ĐẶT PHÒNG THÀNH CÔNG</h2>
        <div className="success-buttons">
          <button className="btn-home" onClick={() => navigate("/dashboard")}>
            Trang chủ
          </button>
          <button className="btn-history" onClick={() => navigate("/dashboard/history")}>
            Lịch sử đặt phòng
          </button>
        </div>
      </div>
    </div>
  );
}



