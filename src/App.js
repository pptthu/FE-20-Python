// File: src/App.js 
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

// --- LAYOUTS ---
import AdminLayout from './layouts/AdminLayout';
import ManagerLayout from './layouts/ManagerLayout';
import StaffLayout from './layouts/StaffLayout'; 
import CustomerLayout from './layouts/CustomerLayout';

import HomePage from './pages/Home';

// --- AUTH PAGES ---

import SignInPage from './pages/Auth/SignIn';
import SignUpPage from './pages/Auth/SignUp';

// --- ADMIN PAGES ---
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserManagementPage from './pages/Admin/UserManagement';
import UserProfilePage from './pages/Admin/UserProfile';

// --- MANAGER PAGES ---
import ManagerDashboard from './pages/Manager/ManagerDashboard';
import LocationManagementPage from './pages/Manager/LocationManagement';
import PodManagementPage from './pages/Manager/PodManagement';

// --- STAFF PAGES ---
import StaffDashboard from './pages/Staff/StaffDashboard';
import StaffManagementPage from './pages/Staff/StaffManagement';
// --- CUSTOMER PAGES  ---
import LoggedInHomePage from './pages/Customer/LoggedInHome';
import ProfilePage from './pages/Customer/Profile';
import EditProfilePage from './pages/Customer/EditProfile';
import HistoryPage from './pages/Customer/History';
import BookingPage from './pages/Customer/Booking';
import PaymentPage from './pages/Customer/Payment';
import BookingSuccessPage from './pages/Customer/BookingSuccess';
import SaveSuccessPage from './pages/Customer/Save'; 


const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('accessToken');
  if (!token) return <Navigate to="/signin" replace />;

  const userRole = localStorage.getItem('userRole');
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />; 
  }
  return children;
};


const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole');

  if (token) {
    if (userRole === 'Admin') return <Navigate to="/admin/dashboard" replace />;
    if (userRole === 'Manager') return <Navigate to="/manager/dashboard" replace />;
    if (userRole === 'Staff') return <Navigate to="/staff/dashboard" replace />;
    if (userRole === 'Customer') return <Navigate to="/dashboard" replace />;
  }
  return children;
};


function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* === CÁC ROUTE CÔNG KHAI === */}
          <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

            {/* === CÁC ROUTE CỦA CUSTOMER === */}
            <Route 
            path="/dashboard" 
            element={<ProtectedRoute allowedRoles={['Customer']}><CustomerLayout /></ProtectedRoute>}
            >
              <Route index element={<LoggedInHomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/edit" element={<EditProfilePage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="booking/:podId" element={<BookingPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="booking-success" element={<BookingSuccessPage />} />
            <Route path="save-success" element={<SaveSuccessPage />} />
          </Route>
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['Admin']}><AdminLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="users/:userId" element={<UserProfilePage />} />
          </Route>

          {/* Manager Routes */}
          <Route path="/manager" element={<ProtectedRoute allowedRoles={['Admin', 'Manager']}><ManagerLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="locations" element={<LocationManagementPage />} />
            <Route path="pods" element={<PodManagementPage />} />
          </Route>

          
          <Route 
            path="/staff" 
            element={<ProtectedRoute allowedRoles={['Admin', 'Manager', 'Staff']}><StaffLayout /></ProtectedRoute>}
          >
            <Route path="dashboard" element={<StaffDashboard />} />
          </Route>

          {/* Staff Routes */}
          <Route 
            path="/staff" 
            element={<ProtectedRoute allowedRoles={['Admin', 'Manager', 'Staff']}><StaffLayout /></ProtectedRoute>}
          >
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="bookings" element={<StaffManagementPage />} />
          </Route>

          <Route path="*" element={<h1>404 - Trang không tồn tại</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;