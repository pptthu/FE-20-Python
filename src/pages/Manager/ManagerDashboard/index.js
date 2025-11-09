// File: src/pages/Manager/ManagerDashboard/index.js

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './ManagerDashboard.css';
import { Typography, Button, Box } from '@mui/material';

const ManagerDashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-image-panel">
                <img src="/dash.png" alt="Manager Dashboard" />
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
                    Quản Lý
                </Typography>

                <Typography variant="h6" sx={{ color: '#5665E9', opacity: 0.9, mb: 4 }}>
                    Chào mừng bạn đến với hệ thống quản lý
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                    <Button
                        component={RouterLink}
                        to="/manager/pods"
                        variant="outlined"
                        sx={{
                            width: '377px', height: '68px', borderRadius: '90px',
                            border: '1px solid #89AAFC', color: '#000000',
                            fontSize: '18px', fontWeight: 'bold',
                            '&:hover': { backgroundColor: 'rgba(137, 170, 252, 0.1)', border: '1px solid #89AAFC' }
                        }}
                    >
                        QUẢN LÝ PHÒNG
                    </Button>
                    <Button
                        component={RouterLink}
                        to="/manager/locations"
                        variant="outlined"
                        sx={{
                            width: '377px', height: '68px', borderRadius: '90px',
                            border: '1px solid #89AAFC', color: '#000000',
                            fontSize: '18px', fontWeight: 'bold',
                            '&:hover': { backgroundColor: 'rgba(137, 170, 252, 0.1)', border: '1px solid #89AAFC' }
                        }}
                    >
                        QUẢN LÝ ĐỊA ĐIỂM
                    </Button>
                </Box>
            </div>
        </div>
    );
};

export default ManagerDashboard;