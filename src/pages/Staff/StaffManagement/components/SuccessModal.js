// File: src/pages/Staff/StaffManagement/components/SuccessModal.js
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
    
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '746px',
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

const SuccessModal = ({ open, onClose, message, primaryActionText, onPrimaryAction, secondaryActionText, onSecondaryAction }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <img src="/logo.png" alt="Logo" style={{ width: '158px', marginBottom: '24px' }}/>

                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                    {message}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    {secondaryActionText && (
                        <Button 
                            onClick={onSecondaryAction} 
                            variant="outlined" 
                            sx={{ width: '180px', height: '50px', borderRadius: '12px' }}
                        >
                            {secondaryActionText}
                        </Button>
                    )}
                    
                    <Button 
                        onClick={onPrimaryAction} 
                        variant="contained" 
                        sx={{ width: '180px', height: '50px', borderRadius: '12px' }}
                    >
                        {primaryActionText}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default SuccessModal;