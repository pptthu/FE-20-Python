// File: src/pages/Admin/UserManagement/components/AddUserModal.js 

import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, IconButton, FormHelperText } from '@mui/material';
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

const AddUserModal = ({ open, onClose, onSave }) => {
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '', role: '' });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
        }
        if (name === 'password' && errors.confirmPassword) {
            setErrors(prevErrors => ({ ...prevErrors, confirmPassword: null }));
        }
    };

    const handleClose = () => {
        setFormData({ fullName: '', email: '', password: '', confirmPassword: '', role: '' }); // Reset form
        setErrors({}); 
        onClose(); 
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.fullName.trim()) tempErrors.fullName = "Vui lòng điền họ và tên.";
        if (!formData.email.trim()) {
            tempErrors.email = "Vui lòng điền email.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email không hợp lệ.";
        }
        if (!formData.password) {
            tempErrors.password = "Vui lòng điền mật khẩu.";
        } else if (formData.password.length < 6) {
            tempErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
        }
        if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
        }
        if (!formData.role) tempErrors.role = "Vui lòng chọn vai trò.";
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };


    const handleSave = () => {
        if (validate()) {
            onSave(formData);
            handleClose(); 
        }
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
                    THÊM NGƯỜI DÙNG
                    </Typography>
    
                    <IconButton 
                        onClick={onClose} 
                        sx={{ 
                        color: 'white',
                        position: 'absolute', 
                        right: 16, 
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                    >
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
                        error={!!errors.fullName}
                        helperText={errors.fullName || ' '}
                    />
                    <TextField fullWidth label="Email" name="email" type="email" alue={formData.email} onChange={handleChange} sx={{ mb: 2 }} InputProps={{ sx: { borderRadius: '20px', height: '69px' } }}
                        error={!!errors.email}
                        helperText={errors.email || ' '} 
                    />
                    <TextField fullWidth label="Mật khẩu" name="password" type="password" value={formData.password} onChange={handleChange} sx={{ mb: 2 }} InputProps={{ sx: { borderRadius: '20px', height: '69px' } }}
                        error={!!errors.password}
                        helperText={errors.password || ' '}
                    />
                    <TextField fullWidth label="Xác nhận mật khẩu" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} sx={{ mb: 2 }} InputProps={{ sx: { borderRadius: '20px', height: '69px' } }}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword || ' '}
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
                            sx={{
                                width: '151px',
                                height: '61px',
                                borderRadius: '20px',
                                borderColor: '#5680E9',
                                color: '#5680E9',
                                fontWeight: 'bold'
                            }}
                        >
                            Hủy
                        </Button>
                        <Button 
                            variant="contained" 
                            onClick={handleSave}
                            sx={{
                                width: '151px',
                                height: '61px',
                                borderRadius: '20px',
                                backgroundColor: '#5680E9',
                                fontWeight: 'bold'
                            }}
                        >
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddUserModal;