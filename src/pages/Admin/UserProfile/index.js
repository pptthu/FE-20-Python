// src/pages/Admin/UserProfile/index.js 

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';


const mockUsers = [
    { id: 1, fullName: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', role: 'Quản lý' },
    { id: 2, fullName: 'Trần Thị B', email: 'tranthib@gmail.com', role: 'Khách hàng' },
    { id: 3, fullName: 'Lê Văn C', email: 'levanc@gmail.com', role: 'Nhân viên' },
];

const UserProfilePage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        let foundUser = null;
        if (location.state && location.state.user) {
            foundUser = location.state.user;
        } else {
            console.log("Không có state, tìm trong mockUsers...");
            foundUser = mockUsers.find(u => u.id === parseInt(userId));
        }

        if (foundUser) {
            setUser(foundUser);
        } else {
            alert("Không tìm thấy thông tin người dùng!");
            navigate('/admin/users');
        }
    }, [userId, location.state, navigate]);


    if (!user) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
    }

    return (
        <Paper sx={{ maxWidth: 800, margin: 'auto', p: 4, borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <img src="/logo.png" alt="Logo" style={{ height: '100px', marginBottom: '16px' }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    THÔNG TIN HỒ SƠ
                </Typography>
                <Box sx={{ width: '80px', height: '4px', backgroundColor: 'black', margin: '8px auto 0' }} />
            </Box>

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField 
                    label="Tên"
                    value={user.fullName} 
                    InputProps={{ readOnly: true }} 
                    variant="filled" 
                />
                <TextField 
                    label="Email"
                    value={user.email} 
                    InputProps={{ readOnly: true }}
                    variant="filled"
                />
                <TextField 
                    label="Vai trò"
                    value={user.role} 
                    InputProps={{ readOnly: true }}
                    variant="filled"
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button 
                        variant="contained" 
                        onClick={() => navigate('/admin/users')}
                    >
                        Quay lại Danh sách
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default UserProfilePage;