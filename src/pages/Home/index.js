import React from "react";
import "./Home.css";
import { useNavigate, Link } from "react-router-dom";
import { Linkedin, Twitter, Facebook, Instagram, Heart } from "lucide-react";

const HomePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken'); 

    const handleBookNowClick = (room) => {
        if (token) {
            navigate(`/booking/${room.id}`, { state: room });
        } else {
            navigate('/signin');
        }
    };

  const rooms = [
    { id: 1, name: "Phòng học đơn", address: "Bình Thạnh", img: "/room1.jpg" },
    { id: 2, name: "Phòng học nhóm", address: "Bình Thạnh", img: "/room2.jpg" },
    { id: 3, name: "Phòng học đơn", address: "Bình Thạnh", img: "/room3.jpg" },
    { id: 4, name: "Phòng học nhóm", address: "Bình Thạnh", img: "/room4.jpg" },
  ];

  return (
    <div className="home-page-container">
      <header className="main-header">
        <div className="logo">
          <img src="/logo.png" alt="logo" style={{ height: '92px', display: 'block' }} />
        </div>
        <nav className="nav-links">
          <span>Trang chủ</span>
          <span>Liên hệ</span>
          <span>Về chúng tôi</span>
        </nav>
        <div className="auth-buttons">
          <button className="btn-login" onClick={() => navigate("/signin")}>Đăng nhập</button>
          <button className="btn-register" onClick={() => navigate("/signup")}>Đăng ký</button>
        </div>
      </header>

      <div className="banner">
        <img src="/banner.jpg" alt="Banner" />
 
      </div>

      <section className="about">
        <div className="about-text">
            Hệ thống POD Booking là giải pháp thông minh giúp bạn dễ dàng tìm kiếm
            và đặt chỗ làm việc cá nhân theo đúng nhu cầu của mình. Với giao diện
            thân thiện và tính năng tìm kiếm tiên tiến, bạn có thể nhanh chóng lựa
            chọn không gian làm việc phù hợp về vị trí, thời gian và tiện nghi. Hệ
            thống cho phép đặt chỗ linh hoạt theo giờ, ngày hoặc tuần, đồng thời cung
            cấp thông tin chi tiết về từng pod bao gồm trang thiết bị, giá cả và tình
            trạng sẵn sàng. Quy trình thanh toán an toàn và xác nhận đặt chỗ tức thì
            giúp bạn tiết kiệm thời gian và đảm bảo có chỗ làm việc khi cần. Hãy trải
            nghiệm POD Booking ngay hôm nay để tối ưu hóa năng suất làm việc của bạn
            với những không gian làm việc chuyên nghiệp và hiện đại!
          </div>
        <div className="about-img">
          <img src="/pod-about.jpg" alt="pod" />
        </div>
      </section>

      <section className="home-rooms">
        <h2 className="section-title">PHÒNG CỦA CHÚNG TÔI</h2>
        <div className="home-room-list">
          {rooms.map((room) => (
            <div key={room.id} className="home-room-card" onClick={() => navigate("/signin")}>
              <div className="home-room-img-wrapper">
                <img src={room.img} alt={room.name} />
                <button className="home-favorite-btn"><Heart size={16} /></button>
              </div>
              <div className="home-room-info">
                <h3>{room.name}</h3>
                <p>{room.address}</p>
                <button className="home-btn">ĐẶT PHÒNG</button>
              </div>
            </div>
          ))}
        </div>
      </section>

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


      <footer className="footer">
        <div className="footer-container">

          <div className="footer-logo">
            <img src="/logo.png" alt="POD Booking Logo" className="logo-img" />
          </div>

          <div className="footer-columns">

            <div className="footer-column">
              <h4>COMPANY</h4>
              <p>About Us</p>
              <p>Legal Information</p>
              <p>Contact Us</p>
              <p>Blogs</p>
            </div>


            <div className="footer-column">
              <h4>HELP CENTER</h4>
              <p>Find a Property</p>
              <p>How To Host?</p>
              <p>Why Us?</p>
              <p>FAQs</p>
              <p>Rental Guides</p>
            </div>


            <div className="footer-column">
              <h4>CONTACT INFO</h4>
              <p>Phone: 1234567890</p>
              <p>Email: company@email.com</p>
              <p>Location: 100 Smart Street, LA, USA</p>

              <div className="social">
                <Facebook />
                <Twitter />
                <Instagram />
                <Linkedin />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default HomePage;