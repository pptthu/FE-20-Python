import React, { useState, useRef, useEffect } from "react";
import "./LoggedInHome.css";
import { useNavigate } from "react-router-dom";
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

export default function Logged() {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null); 

  const user = {
    name: "Customer",
    avatar: null,
  };
  const getInitial = (name) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
  };

  const handleMenuClick = (type) => {
    if (type === "profile") navigate("/profile");
    if (type === "history") navigate("/history");
    if (type === "logout") {
      alert("Bạn đã đăng xuất!");
      navigate("/login");
    }
    setOpenMenu(false);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const rooms = [
    {
      id: 1,
      name: "Phòng Học Đơn ",
      price: "100/2 tiếng",
      address: "Bình Thạnh",
      status:"Trống",
      utilities: "Wi-Fi tốc độ cao, điều hòa, ổ cắm",
      img: "/room1.jpg",
    },
    {
      id: 2,
      name: "Phòng Học Nhóm ",
      price: "150/2 tiếng",
      address: "Bình Thạnh",
      status:"Trống",
      utilities: "Wi-Fi tốc độ cao, điều hòa, ổ cắm",
      img: "/room2.jpg",
    },
    {
      id: 3,
      name: "Phòng Học Đơn ",
      price: "100/2 tiếng",
      address: "Bình Thạnh",
      status:"Trống",
      utilities: "Wi-Fi tốc độ cao, điều hòa, ổ cắm",
      img: "/room3.jpg",
    },
    {
      id: 4,
      name: "Phòng Học Nhóm ",
      price: "180/2 tiếng",
      address: "Bình Thạnh",
      status:"Trống",
      utilities: "Wi-Fi tốc độ cao, điều hòa, ổ cắm",
      img: "/room4.jpg",
    },
  ];

  return (
    <div>

      {/* Banner */}
      <div className="banner">
        <img src="/banner.jpg" alt="Banner" />
      </div>

        {/* DANH SÁCH PHÒNG */}
        <section className="rooms">
          <h2>DANH SÁCH <br /> PHÒNG HỌC </h2>
          <div className="room-list">
            {rooms.map((room) => (
              <div key={room.id} className="room-card">
                <img src={room.img} alt={room.name} />
                <div className="room-info">
                  <h3>{room.name}</h3>
                  <p>
                    <b>Giá thuê:</b> {room.price}
                  </p>
                  <p>
                    <b>Địa chỉ:</b> {room.address}
                  </p>
                  <p>
                    <b>Trạng thái:</b> {room.status}
                  </p>
                  <p>
                    <b>Tiện ích:</b> {room.utilities}
                  </p>
                  <button
                    className="btn"
                    onClick={() => navigate(`/dashboard/booking/${room.id}`, { state: room })}
                  >
                    Đặt phòng
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      {/* PAGINATION */}
      <section className="pagination-section">
        <div className="pagination">
          <button className="page-btn">← Previous</button>
          <span className="page active">1</span>
          <span className="page">2</span>
          <span className="page">3</span>
          <span className="dots">...</span>
          <span className="page">67</span>
          <span className="page">68</span>
          <button className="page-btn">Next →</button>
        </div>
      </section>

      {/* NEWSLETTER */}
      <div className="newsletter">
        <div className="newsletter-box">
          <div className="newsletter-top">
            <h4>NEWSLETTER</h4>
            <div className="newsletter-input">
              <input type="email" placeholder="Your Email..." />
              <button>➤</button>
            </div>
          </div>
          <p>Stay Up to Date</p>
        </div>
      </div>

    
    </div>
  );
}