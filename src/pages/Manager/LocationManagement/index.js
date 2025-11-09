// File: src/pages/Manager/LocationManagement/index.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import './LocationManagement.css'; 
import SuccessModal from '../../Admin/UserManagement/components/SuccessModal';

const initialLocationData = {
    id: 1, 
    name: 'POD Booking - Chi nhánh Bình Thạnh', 
    address: '456 Xô Viết Nghệ Tĩnh, P. 25, Q. Bình Thạnh, TP.HCM'
};

const LocationManagementPage = () => {
    const [locationData, setLocationData] = useState(initialLocationData);
    const [originalData, setOriginalData] = useState(initialLocationData);
    const [isEditing, setIsEditing] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => setLocationData({ ...locationData, [e.target.name]: e.target.value });
    const handleSave = () => {
        setOriginalData(locationData);
        setIsEditing(false);
        setSuccessMessage('Cập nhật địa điểm thành công');
        setOpenSuccessModal(true);
    };
    const handleCancel = () => {
        setLocationData(originalData);
        setIsEditing(false);
    };

    return (
        <div className="location-form-container">
            <Box sx={{ textAlign: 'center', mb: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Thông Tin Địa Điểm
                </Typography>
            </Box>

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel shrink htmlFor="location-name" sx={{ fontSize: '22px', fontWeight: 'bold', color: 'black' }}>
                        Tên địa điểm
                    </InputLabel>
                    <TextField 
                        id="location-name"
                        name="name"
                        value={locationData.name} 
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{
                            readOnly: !isEditing,
                            sx: { 
                                borderRadius: '20px', 
                                mt: '32px',
                                backgroundColor: isEditing ? 'white' : '#f5f5f5', 
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#5680E9', 
                                    borderWidth: '2px', 
                                },
                            }
                        }}
                    />
                </FormControl>
                <FormControl variant="standard" fullWidth>
                    <InputLabel shrink htmlFor="location-address" sx={{ fontSize: '22px', fontWeight: 'bold', color: 'black' }}>
                        Địa chỉ
                    </InputLabel>
                    <TextField 
                        id="location-address"
                        name="address"
                        value={locationData.address} 
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={3}
                        InputProps={{
                            readOnly: !isEditing,
                            sx: { 
                                borderRadius: '20px', 
                                mt: '32px',
                                backgroundColor: isEditing ? 'white' : '#f5f5f5',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#5680E9', 
                                    borderWidth: '2px',
                                },
                            }
                        }}
                    />
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
                    {isEditing ? (
                        <>
                            <Button variant="outlined" onClick={handleCancel} sx={{ width: '151px', height: '60px', borderRadius: '20px', borderColor: '#5680E9', color: '#5680E9', fontWeight: 'bold' }}>
                                Hủy
                            </Button>
                            <Button variant="contained" onClick={handleSave} sx={{ width: '151px', height: '60px', borderRadius: '20px', backgroundColor: '#5680E9', fontWeight: 'bold' }}>
                                Lưu thay đổi
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" startIcon={<EditIcon />} onClick={() => setIsEditing(true)} sx={{ width: '250px', height: '60px', borderRadius: '20px', backgroundColor: '#5680E9', fontWeight: 'bold' }}>
                            Cập nhật địa điểm
                        </Button>
                    )}
                </Box>
            </Box>

             <SuccessModal 
                open={openSuccessModal}
                onClose={() => setOpenSuccessModal(false)}
                message={successMessage}
                primaryActionText="Quay lại"
                onPrimaryAction={() => setOpenSuccessModal(false)}
                secondaryActionText={null}
            />
        </div>
    );
};

export default LocationManagementPage;