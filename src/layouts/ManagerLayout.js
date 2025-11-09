//src/layouts/AdminLayout.js 
import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Button } from '@mui/material';
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        handleClose();
        navigate('/signin');
    };

    return (
        // Header
        <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
            <AppBar position="static" sx={{ 
                backgroundColor: 'white', 
                color: 'black', 
                boxShadow: 'none', 
                borderBottom: '2px solid #89AAFC',
                padding: '0 40px', 
                height: '83px',                   
                justifyContent: 'center',
            }}>
                <Toolbar disableGutters sx={{ padding: '0 40px', width: '100%' }}>
                {/* Logo */}
                    <Box component={RouterLink} to="/manager/dashboard" sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/logo.png" alt="POD Booking Logo" style={{ height: '92px', display: 'block' }} />
                    </Box>

        {/* Menu */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Button component={RouterLink} to="/manager/locations" sx={{ fontWeight: 600, color: 'black', textTransform: 'none' }}>
                Quản lý địa điểm
            </Button>
            <Button component={RouterLink} to="/manager/pods" sx={{ fontWeight: 600, color: 'black', textTransform: 'none', ml: 4 }}>
                Quản lý phòng
            </Button>
        </Box>
    
        {/* Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleMenu} size="small" sx={{ p: 0 }}>
                <Avatar sx={{ width: 50, height: 50, bgcolor: '#e0e0e0' }} />
            </IconButton>
            <Typography sx={{ ml: 1.5, fontWeight: 600 }}>Manager</Typography>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
            },
                },
                    }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                            <MenuItem onClick={handleLogout} sx={{width: 200, justifyContent: 'center'}}>
                                <Button variant="contained" fullWidth sx={{backgroundColor: '#5680E9'}}>
                                    Đăng xuất
                                </Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{ p: 4 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;