import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";

export default function Booking1() {
  const location = useLocation();
  const navigate = useNavigate();

  const room = location.state || {};

  const [time, setTime] = useState("");
  const [numPeople, setNumPeople] = useState("");

  const handleConfirm = () => {
    if (!time || !numPeople) {
      alert("Vui lòng nhập đủ thông tin");
      return;
    }
    const bookingData = {
      roomId: room.id,
      roomName: room.name,
      time,
      numPeople,
      price: room.price,
    };
    navigate("/dashboard/payment", { state: bookingData });
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="/logo.jpg" alt="Logo" />
      </div>

      <div className="title">ĐẶT PHÒNG</div>

      <div className="content">
        <div className="imageWrapper">
          <img src={room.img || "/room1.jpg"} alt={room.name} />
        </div>

        <div className="form">
          <div>
            <input
              type="text"
              value={room.name || ""}
              disabled
              placeholder="Dạng phòng: Phòng học nhóm"
              className="input"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Thời gian: "
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <input
              type="number"
              min={1}
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
              placeholder="Số người: "
              className="input"
            />
          </div>

          <div>
            <input
              type="text"
              value={`Giá: ${room.price || "150k/2 tiếng"}`}
              disabled
              className="input"
            />
          </div>

          <div className="buttons">
            <button
              onClick={() => navigate("/dashboard")}
              className="buttonBack"
            >
              Quay lại
            </button>

            <button onClick={handleConfirm} className="buttonConfirm">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

