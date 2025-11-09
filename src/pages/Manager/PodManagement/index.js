// File: src/pages/Manager/PodManagement/index.js 
import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, Paper, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './PodManagement.css'; 
import AddPodModal from './components/AddPodModal';
import EditPodModal from './components/EditPodModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import SuccessModal from '../../Admin/UserManagement/components/SuccessModal';

const initialPods = [
    { id: 1, name: 'POD Đơn A1', location: 'POD Booking - Chi nhánh Bình Thạnh', price: 100000, status: 'Trống' },
    { id: 2, name: 'POD Nhóm B2', location: 'POD Booking - Chi nhánh Bình Thạnh', price: 150000, status: 'Đã đặt' },
    { id: 3, name: 'POD Đơn A2', location: 'POD Booking - Chi nhánh Bình Thạnh', price: 100000, status: 'Trống' },
    { id: 4, name: 'POD Nhóm B1', location: 'POD Booking - Chi nhánh Bình Thạnh', price: 150000, status: 'Trống' },
];

const PodManagementPage = () => {
    const [pods, setPods] = useState(initialPods);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedPod, setSelectedPod] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const filteredPods = useMemo(() => 
        pods.filter(pod => pod.name.toLowerCase().includes(searchTerm.toLowerCase())), 
        [pods, searchTerm]
    );

    const handleChangePage = (event, newPage) => setPage(newPage - 1);

    const handleEdit = (pod) => {
        setSelectedPod(pod);
        setOpenEditModal(true);
    };
    
    const handleDelete = (pod) => {
        setSelectedPod(pod);
        setOpenDeleteModal(true);
    };
    
    const confirmDelete = () => {
        setPods(pods.filter(p => p.id !== selectedPod.id));
        setOpenDeleteModal(false);
        setSuccessMessage(`ĐÃ XÓA PHÒNG: ${selectedPod.name}`);
        setOpenSuccessModal(true);
    };

    const handleSaveNewPod = (newPod) => {
        const newPodData = { ...newPod, id: Date.now(), location: 'POD Booking - Chi nhánh Bình Thạnh' };
        setPods([...pods, newPodData]);
        setOpenAddModal(false);
        setSuccessMessage('THÊM PHÒNG POD THÀNH CÔNG');
        setOpenSuccessModal(true);
    };
    
    const handleSaveUpdatedPod = (updatedPod) => {
        setPods(pods.map(p => p.id === updatedPod.id ? { ...p, ...updatedPod } : p));
        setOpenEditModal(false);
        setSuccessMessage(`CẬP NHẬT PHÒNG POD THÀNH CÔNG`);
        setOpenSuccessModal(true);
    };

    return (
        <div className="management-container">
            <div className="table-header">
                <Box sx={{ width: 180 }} /> 
                <Typography variant="h4" className="table-title">
                    QUẢN LÝ PHÒNG POD
                </Typography>
                <Button 
                    variant="contained" 
                    startIcon={<AddIcon />} 
                    onClick={() => setOpenAddModal(true)}
                    className="add-button"
                >
                    Thêm Phòng
                </Button>
            </div>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <TextField
                    placeholder="Tìm kiếm..."
                    fullWidth
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
                    }}
                />
                {searchTerm && (
                    <Button variant="text" onClick={() => setSearchTerm('')}>
                        Xóa bộ lọc
                    </Button>
                )}
            </Box>

            <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 'none', border: '1px solid #dee2e6' }}>
                <Table className="custom-table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header-cell">STT</TableCell>
                            <TableCell className="table-header-cell">Tên Phòng POD</TableCell>
                            <TableCell className="table-header-cell">Địa điểm</TableCell>
                            <TableCell className="table-header-cell">Giá (VND/giờ)</TableCell>
                            <TableCell className="table-header-cell">Trạng Thái</TableCell>
                            <TableCell className="table-header-cell">Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredPods.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredPods
                        ).map((pod, index) => (
                            <TableRow key={pod.id}>
                                <TableCell className="MuiTableCell-body">{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell className="MuiTableCell-body">{pod.name}</TableCell>
                                <TableCell className="MuiTableCell-body">{pod.location}</TableCell>
                                <TableCell className="MuiTableCell-body">{pod.price.toLocaleString('vi-VN')}</TableCell>
                                <TableCell className="MpiTableCell-body">{pod.status}</TableCell>
                                <TableCell className="MuiTableCell-body">
                                    <IconButton size="small" onClick={() => handleEdit(pod)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => handleDelete(pod)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Box className="pagination-container">
                <Pagination 
                    count={Math.ceil(filteredPods.length / rowsPerPage)}
                    page={page + 1}
                    onChange={handleChangePage}
                    color="primary"
                    shape="rounded"
                />
            </Box>
            <AddPodModal open={openAddModal} onClose={() => setOpenAddModal(false)} onSave={handleSaveNewPod} />
            {selectedPod && (
                <EditPodModal 
                    open={openEditModal} 
                    onClose={() => setOpenEditModal(false)} 
                    pod={selectedPod} 
                    onSave={handleSaveUpdatedPod} 
                />
            )}
            {selectedPod && (
                <DeleteConfirmationModal 
                    open={openDeleteModal} 
                    onClose={() => setOpenDeleteModal(false)} 
                    onConfirm={confirmDelete} 
                    podName={selectedPod.name}
                />
            )}
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

export default PodManagementPage;