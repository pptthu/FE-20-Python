// File: src/pages/Staff/StaffManagement/components/ConfirmationModal.js
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '500px', 
    background: 'linear-gradient(to right, #F0F9FF, #C6E6FC)',
    borderRadius: '24px',
    boxShadow: 24,
    padding: '32px',
    outline: 'none',
    textAlign: 'center'
};

const ConfirmationModal = ({ open, onClose, onConfirm, title }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                    {title}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button onClick={onClose} variant="outlined" sx={{ width: '120px' }}>
                        Hủy
                    </Button>
                    <Button onClick={onConfirm} variant="contained" sx={{ width: '120px' }}>
                        Xác nhận
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;