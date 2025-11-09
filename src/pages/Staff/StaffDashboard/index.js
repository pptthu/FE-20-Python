// File: src/pages/Admin/AdminDashboard/index.js 
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './StaffDashboard.css';
import { Typography, Button, Box } from '@mui/material';

const StaffDashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-image-panel">
                <img src="/dash.png" alt="Staff Dashboard" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '30px'}} />
            </div>
            <div className="dashboard-content-panel">
                <Typography 
                    variant="h3"
                    sx={{ 
                        fontFamily: "'Roboto', sans-serif", 
                        fontWeight: 800,
                        fontSize: '48px',
                        color: '#5665E9',
                        textTransform: 'uppercase',
                        lineHeight: '1.2',
                        mb: 1
                    }}
                >
                    Nhân Viên 
                </Typography>

                <Typography variant="h6" sx={{ color: '#5665E9', opacity: 0.9 }}>
                    Chào mừng bạn đến với hệ thống nhân viên
                </Typography>

                <Button
                    component={RouterLink}
                    to="/staff/bookings"
                    variant="outlined"
                    sx={{
                        mt: 4,
                        width: '377px',
                        height: '68px',
                        borderRadius: '90px',
                        border: '1px solid #89AAFC',
                        color: '#000000',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: 'rgba(137, 170, 252, 0.1)',
                            border: '1px solid #89AAFC',
                        }
                    }}
                >
                    DANH SÁCH BOOKING
                </Button>
            </div>
        </div>
    );
};

export default StaffDashboard;