import React, { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import "./CustomerLayout.css";
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react"; 

const CustomerLayout = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  

  const [user, setUser] = useState({
    name: "Customer", 
    avatar: null
  });

  useEffect(() => {

  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   const handleMenuClick = (action) => {
        setOpenMenu(false); 

        if (action === 'logout') {
            handleLogout(); 
        } else {
            navigate(action); 
        }
    };
  
  const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        navigate('/signin');
  };

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className="customer-layout">
      <header className="main-header">
        <Link to="/dashboard">
          <img src="/logo.png" alt="logo" style={{ height: '92px', display: 'block' }} />
        </Link>

        <nav className="nav-links">
          <span>Trang chủ</span>
          <span>Liên hệ</span>
          <span>Về chúng tôi</span>
        </nav>

        <div className="user-menu" ref={menuRef}>
          <div
            className="user-info"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="avatar" />
            ) : (
              <div className="avatar-circle">{getInitial(user.name)}</div>
            )}
            <span className="user-name">{user.name}</span>
          </div>

          {openMenu && (
            <div className="dropdown">
              <p onClick={() => handleMenuClick("/dashboard/profile")}>Thông tin hồ sơ</p>
              <p onClick={() => handleMenuClick("/dashboard/history")}>Lịch sử đặt chỗ</p>
              <p onClick={handleLogout}>Đăng xuất</p>
            </div>
          )}
        </div>
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>

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
};

export default CustomerLayout;