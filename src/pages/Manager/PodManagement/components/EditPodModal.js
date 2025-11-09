// File: src/pages/Manager/PodManagement/components/EditPodModal.js

import React, { useState, useEffect } from 'react';
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

const EditPodModal = ({ open, onClose, onSave, pod }) => {
    const [formData, setFormData] = useState({ id: null, name: '', price: '', status: '', location_id: mockLocation.id });

    useEffect(() => {
        if (pod) {
            setFormData({
                id: pod.id,
                name: pod.name || '',
                price: pod.price || '',
                status: pod.status || '',
                location_id: mockLocation.id 
            });
        }
    }, [pod, open]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (!formData.name.trim() || !formData.price) {
            alert('Vui lòng điền đầy đủ tên và giá phòng.');
            return;
        }
        onSave(formData);
        onClose(); 
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Box sx={{ backgroundColor: '#5680E9', color: 'white', padding: '24px 32px', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                        CẬP NHẬT PHÒNG POD
                    </Typography>
                    <IconButton onClick={onClose} sx={{ color: 'white', position: 'absolute', right: 16 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ p: 4 }}>
                    <TextField fullWidth label="Loại Phòng" name="name" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} InputProps={{ sx: { borderRadius: '20px', height: '69px' } }} />
                    <TextField fullWidth label="Giá" name="price" type="number" value={formData.price} onChange={handleChange} sx={{ mb: 2 }} InputProps={{ sx: { borderRadius: '20px', height: '69px' } }} />
                    
                    <TextField
                        fullWidth
                        label="Địa điểm"
                        name="location"
                        value={mockLocation.name}
                        sx={{ mb: 2 }}
                        InputProps={{
                            readOnly: true,
                            sx: { borderRadius: '20px', height: '69px', backgroundColor: '#fffff' }
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
                                value="Đã đặt" 
                                sx={{ 
                                    height: '60px', 
                                    justifyContent: 'center',
                                    '&:hover': { backgroundColor: '#89AAFC', color: 'white' },
                                    '&.Mui-selected': { backgroundColor: '#5680E9', color: 'white' },
                                    '&.Mui-selected:hover': { backgroundColor: '#466acb' }
                                }}
                            >
                                Đã đặt
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
                        <Button onClick={onClose} variant="outlined" sx={{ width: '151px', height: '61px',  }}>
                            Hủy
                        </Button>
                        <Button variant="contained" onClick={handleSave} sx={{ width: '151px', height: '61px',  }}>
                            Lưu thay đổi
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditPodModal;