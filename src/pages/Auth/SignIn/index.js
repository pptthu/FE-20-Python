import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import "../SignUp/SignUp.css"; 

const mockUsers = [
    { email: 'admin@gmail.com', password: '123456', role: 'Admin', fullName: 'Admin User' },
    { email: 'manager@gmail.com', password: '123456', role: 'Manager', fullName: 'Manager User' },
    { email: 'staff@gmail.com', password: '123456', role: 'Staff', fullName: 'Staff User' },
    { email: 'customer@gmail.com', password: '123456', role: 'Customer', fullName: 'Customer User' },
];

function SignInPage() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); 

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const allUsers = [...mockUsers, ...registeredUsers];
    
    const foundUser = allUsers.find(
      user => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem('accessToken', 'fake_jwt_token');
      localStorage.setItem('userRole', foundUser.role);
      localStorage.setItem('userInfo', JSON.stringify({ fullName: foundUser.fullName }));

      switch (foundUser.role) {
        case 'Admin': navigate('/admin/dashboard'); break;
        case 'Manager': navigate('/manager/dashboard'); break;
        case 'Staff': navigate('/staff/dashboard'); break;
        case 'Customer': navigate('/dashboard'); break;
        default: navigate('/'); break;
      }
    } else {
      setError("Email hoặc mật khẩu không chính xác.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src="/SignIn.png" alt="signin illustration" className="auth-img" />
      </div>

      <div className="auth-right">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-logo">
            <img src="/logo.png" alt="Logo" className="signup-logo-img" />
          </div>

          

          <input
            type="email"
            placeholder="Email"
            className="signup-input" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className="signup-input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="signup-button">
            Đăng nhập
          </button>

          <p className="signup-text">
            Bạn chưa có tài khoản?{" "}
            <Link to="/signup" className="signup-link">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;