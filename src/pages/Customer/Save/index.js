import React from "react";
import { useNavigate } from "react-router-dom";
import "./Save.css";

export default function Save() {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">
        <img
          src="/logo.png" 
          alt="POD Booking System"
          className="success-logo"
        />
        <h2 className="success-title">Lưu thông tin thành công</h2>

        <div className="success-buttons">
          <button className="btn-home" onClick={() => navigate("/dashboard/profile")}>
            Thông tin hồ sơ
          </button>
        </div>
      </div>
    </div>
  );
}
