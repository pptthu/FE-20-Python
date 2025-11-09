// File: src/pages/Admin/UserManagement/components/EditUserModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 746,
  bgcolor: '#FFFFFF',
  boxShadow: 24,
  borderRadius: '30px',
  p: 0,
  outline: 'none',
};

const EditUserModal = ({ open, onClose, onSave, user }) => {
    const [formData, setFormData] = useState({ id: null, fullName: '', email: '', role: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id,
                fullName: user.fullName || '',
                email: user.email || '',
                role: user.role || ''
            });
        }
    }, [user, open]); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(formData); 
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Box sx={{
                    backgroundColor: '#5680E9',
                    color: 'white',
                    padding: '24px 32px',
                    borderTopLeftRadius: '30px',
                    borderTopRightRadius: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                        CẬP NHẬT THÔNG TIN
                    </Typography>
                    <IconButton onClick={onClose} sx={{ color: 'white', position: 'absolute', right: 16 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ p: 4 }}>
                    <TextField 
                        fullWidth 
                        label="Họ và tên" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange} 
                        sx={{ mb: 2 }} 
                        InputProps={{ sx: { borderRadius: '20px', height: '69px' } }}
                    />
                    <TextField 
                        fullWidth 
                        label="Email" 
                        name="email" 
                        type="email"
                        value={formData.email}
                        onChange={handleChange} 
                        sx={{ mb: 2 }} 
                        InputProps={{ sx: { borderRadius: '20px', height: '69px' } }}
                    />
                    

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Vai trò</InputLabel>
                            <Select 
                                name="role" 
                                value={formData.role} 
                                label="Vai trò" 
                                onChange={handleChange}
                                sx={{ borderRadius: '20px', height: '69px' }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            borderRadius: '20px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                            marginTop: '8px',
                                        },
                                    },
                                }}
                            >
                    <MenuItem 
                        value="Khách hàng" 
                        sx={{ 
                            height: '60px', 
                            justifyContent: 'center',
                            '&:hover': { backgroundColor: '#89AAFC', color: 'white' },
                            '&.Mui-selected': { backgroundColor: '#5680E9', color: 'white' },
                            '&.Mui-selected:hover': { backgroundColor: '#466acb' }
                        }}
                    >
                        Khách hàng
                    </MenuItem>
                    <MenuItem 
                        value="Nhân viên" 
                        sx={{ 
                            height: '60px', 
                            justifyContent: 'center',
                            '&:hover': { backgroundColor: '#89AAFC', color: 'white' },
                            '&.Mui-selected': { backgroundColor: '#5680E9', color: 'white' },
                            '&.Mui-selected:hover': { backgroundColor: '#466acb' }
                        }}
                    >
                        Nhân viên
                    </MenuItem>
                    <MenuItem 
                        value="Quản lý" 
                        sx={{ 
                            height: '60px', 
                            justifyContent: 'center',
                            '&:hover': { backgroundColor: '#89AAFC', color: 'white' },
                            '&.Mui-selected': { backgroundColor: '#5680E9', color: 'white' },
                            '&.Mui-selected:hover': { backgroundColor: '#466acb' }
                        }}
                    >
                        Quản lý
                    </MenuItem>
                    </Select>
                    </FormControl>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                                    <Button 
                                        onClick={onClose} 
                                        variant="outlined"
                                        sx={{  }}
                                    >
                                        Hủy
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        onClick={handleSave}
                                        sx={{ }}
                                    >
                                        Lưu
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
    );
};

export default EditUserModal;