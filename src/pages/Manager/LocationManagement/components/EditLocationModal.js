import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
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

const EditLocationModal = ({ open, onClose, onSave, location }) => {
    const [formData, setFormData] = useState({ id: null, name: '', address: '' });

    useEffect(() => {
        if (location) {
            setFormData(location);
        }
    }, [location, open]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (!formData.name.trim() || !formData.address.trim()) {
            alert('Vui lòng điền đầy đủ thông tin.');
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
                        CẬP NHẬT ĐỊA ĐIỂM
                    </Typography>
                    <IconButton onClick={onClose} sx={{ color: 'white', position: 'absolute', right: 16 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ p: 4 }}>
                    <TextField fullWidth label="Tên địa điểm" name="name" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} InputProps={{ sx: { borderRadius: '20px', height: '69px' } }} />
                    <TextField fullWidth label="Địa chỉ" name="address" value={formData.address} onChange={handleChange} sx={{ mb: 2 }} multiline rows={3} InputProps={{ sx: { borderRadius: '20px' } }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                        <Button onClick={onClose} variant="outlined" sx={{ width: '151px', height: '61px', borderRadius: '20px', borderColor: '#5680E9', color: '#5680E9', fontWeight: 'bold' }}>
                            Hủy
                        </Button>
                        <Button variant="contained" onClick={handleSave} sx={{ width: '151px', height: '61px', borderRadius: '20px', backgroundColor: '#5680E9', fontWeight: 'bold' }}>
                            Lưu thay đổi
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditLocationModal;