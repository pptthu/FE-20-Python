import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate, Link } from "react-router-dom";


function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Hàm validate mới
  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Vui lòng điền họ và tên.";
    if (!formData.email.trim()) tempErrors.email = "Vui lòng điền email.";
    if (!formData.password) {
        tempErrors.password = "Vui lòng điền mật khẩu.";
    } else if (formData.password.length < 6) {
        tempErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
      
     
      const newUser = {
        email: formData.email,
        password: formData.password,
        role: 'Customer', 
        name: formData.name,
      };

  
      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      alert("Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.");
      navigate("/signin");
    }
};


  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src="/SignIn.png" alt="signup illustration" className="auth-img" />
      </div>

      <div className="auth-right">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-logo">
            <img src="/logo.png" alt="Logo" className="signup-logo-img" />
          </div>

          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            className="signup-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="auth-error">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Nhập email của bạn"
            className="signup-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="auth-error">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            className="signup-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="auth-error">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            className="signup-input"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {errors.confirmPassword && <p className="auth-error">{errors.confirmPassword}</p>}

          <button type="submit" className="signup-button">Đăng ký</button>

          <p className="signup-text">
            Bạn đã có tài khoản?{" "}
            <Link to="/signin" className="signup-link">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;


