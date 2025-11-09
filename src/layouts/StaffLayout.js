import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Button } from '@mui/material';
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';

const StaffLayout = () => {
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
                <Toolbar disableGutters sx={{ padding: '0 55px' }}>
                    {/* Logo */}
                    <Box component={RouterLink} to="/staff/dashboard" sx={{ flexGrow: 1 }}>
                        <img src="/logo.png" alt="POD Booking Logo" style={{ height: '92px', display: 'block' }} />
                    </Box>
                    
                    {/* Avatar và Menu  */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={handleMenu} size="small" sx={{ p: 0 }}>
                            <Avatar sx={{ width: 50, height: 50, bgcolor: '#C1C8E4' }}>
                            </Avatar>
                        </IconButton>
                        <Typography sx={{ ml: 1.5, fontWeight: 600 }}>Staff</Typography> 
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

export default StaffLayout;