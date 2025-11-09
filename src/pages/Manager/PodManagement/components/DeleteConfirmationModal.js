// File: src/pages/Admin/UserManagement/components/DeleteConfirmationModal.js 

import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '746px',
    bgcolor: 'background.paper',
    background: 'linear-gradient(to right, #F0F9FF, #C6E6FC)',
    borderRadius: '30px',
    boxShadow: 24,
    padding: '32px',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
};

const DeleteConfirmationModal = ({ open, onClose, onConfirm, podName }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <img src="/logo.png" alt="Logo" style={{ width: '158px', marginBottom: '24px' }}/>

                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Bạn có chắc muốn xóa phòng "{podName}"?
                </Typography>

                <Typography variant="body1" sx={{ mt: 1, mb: 3, color: 'text.secondary' }}>
                    Hành động này không thể hoàn tác.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                        onClick={onClose} 
                        variant="outlined" 
                        sx={{ width: '180px', height: '50px', borderRadius: '12px' }}
                    >
                        Hủy
                    </Button>
                    <Button 
                        onClick={onConfirm} 
                        variant="contained" 
                        color="error" 
                        sx={{ width: '180px', height: '50px', borderRadius: '12px' }}
                    >
                        Xác nhận
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteConfirmationModal;