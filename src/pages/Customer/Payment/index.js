import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

function PayPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard/booking-success");
    }, 5000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="pay-container">
      <div className="pay-card">

        <div className="pay-header">
          <span 
            className="back-arrow" 
            onClick={() => navigate(-1)}  
          >
            ←
          </span>
          <h2 className="pay-title">XÁC NHẬN THANH TOÁN</h2>
        </div>

        <p className="pay-subtitle">"Quét mã bên dưới để thanh toán"</p>

        <div className="qr-section">
          <img src="/pay.jpg" alt="QR Code" className="qr-image" />
          <p className="qr-text">0123456789</p>
          <p className="qr-subtext">POD Booking System</p>
        </div>
      </div>
    </div>
  );
}

export default PayPage;

