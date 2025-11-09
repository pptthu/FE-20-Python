// File: src/pages/Manager/PodManagement/components/AddPodModal.js 

import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '746px',
  bgcolor: '#FFFFFF',
  boxShadow: 24,
  borderRadius: '30px',
  p: 0,
  outline: 'none',
};

const mockLocation = { id: 2, name: 'POD Booking - Chi nhánh Bình Thạnh' };

const AddPodModal = ({ open, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        location_id: mockLocation.id, 
        status: 'Trống'
    });
    const [errors, setErrors] = useState({ name: '', price: '' });
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
        setErrors({ ...errors, [name]: null });
    }
    };
    
    const handleClose = () => {
        setFormData({ name: '', price: '', location_id: mockLocation.id, status: 'Trống' });
        onClose();
    };

    const handleSave = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
        newErrors.name = "Vui lòng điền tên phòng.";
    }
    if (!formData.price) {
        newErrors.price = "Vui lòng điền giá phòng.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
        onSave({ name: formData.name, price: Number(formData.price), status: formData.status, location_id: formData.location_id });
        handleClose();
    }
};

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Box sx={{ backgroundColor: '#5680E9', color: 'white', padding: '24px 32px', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                        THÊM PHÒNG POD
                    </Typography>
                    <IconButton onClick={handleClose} sx={{ color: 'white', position: 'absolute', right: 16 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{ p: 4 }}>
                    <TextField fullWidth label="Loại Phòng" name="name" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} InputProps={{ sx: { borderRadius: '20px', height: '69px' } }} />
                    {errors.name && <Typography color="error" variant="caption" sx={{ pl: 2, mb: 1 }}>{errors.name}</Typography>}
                    <TextField fullWidth label="Giá" name="price" type="number" value={formData.price} onChange={handleChange} sx={{ mb: 2 }} InputProps={{ sx: { borderRadius: '20px', height: '69px' } }} />
                    {errors.price && <Typography color="error" variant="caption" sx={{ pl: 2, mb: 1 }}>{errors.price}</Typography>}

                    <TextField
                        fullWidth
                        label="Địa điểm"
                        name="location"
                        value={mockLocation.name} 
                        sx={{ mb: 2 }}
                        InputProps={{
                            readOnly: true, 
                            sx: { 
                                borderRadius: '20px', 
                                height: '69px',
                                backgroundColor: '#ffffff' 
                            }
                        }}
                    />
                        <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Trạng thái</InputLabel>
                        <Select 
                            name="status" 
                            value={formData.status} 
                            label="Trạng thái" 
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
                                value="Trống" 
                                sx={{ 
                                    height: '60px', 
                                    justifyContent: 'center',
                                    '&:hover': { backgroundColor: '#89AAFC', color: 'white' },
                                    '&.Mui-selected': { backgroundColor: '#5680E9', color: 'white' },
                                    '&.Mui-selected:hover': { backgroundColor: '#466acb' }
                                }}
                            >
                                Trống
                            </MenuItem>
                            <MenuItem 
                                value="Bảo trì" 
                                sx={{ 
                                    height: '60px', 
                                    justifyContent: 'center',
                                    '&:hover': { backgroundColor: '#89AAFC', color: 'white' },
                                    '&.Mui-selected': { backgroundColor: '#5680E9', color: 'white' },
                                    '&.Mui-selected:hover': { backgroundColor: '#466acb' }
                                }}
                            >
                                Bảo trì
                            </MenuItem>
                        </Select>
                    </FormControl>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                        <Button onClick={handleClose} variant="outlined" sx={{ width: '151px', height: '61px', }}>
                            Hủy
                        </Button>
                        <Button variant="contained" onClick={handleSave} sx={{ width: '151px', height: '61px',  }}>
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddPodModal;