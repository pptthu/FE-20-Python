// Ở đầu file StaffManagement/index.js
import React, { useState, useMemo, useEffect } from 'react'; 
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, TextField, InputAdornment, Pagination, CircularProgress } from '@mui/material'; // Bổ sung TextField, InputAdornment, Pagination
import SearchIcon from '@mui/icons-material/Search'; 
import './StaffManagement.css';
import ConfirmationModal from './components/ConfirmationModal';
import SuccessModal from '../../Admin/UserManagement/components/SuccessModal';
import staffApi from '../../../api/staffApi'; 

{/*
const initialBookings = [
    { id: 101, customerName: 'Nguyễn Văn A', podName: 'POD Đơn A1', checkInTime: '09:00 06/09/2025', checkOutTime: '11:00 06/09/2025', status: 'confirmed' },
    { id: 102, customerName: 'Trần Thị B', podName: 'POD Nhóm B2', checkInTime: '10:30 06/09/2025', checkOutTime: '12:30 06/09/2025', status: 'checked_in' },
    { id: 103, customerName: 'Lê Văn C', podName: 'POD Đơn A2', checkInTime: '14:00 06/09/2025', checkOutTime: '15:00 06/09/2025', status: 'confirmed' },
    { id: 104, customerName: 'Phạm Thị D', podName: 'POD Đơn A1', checkInTime: '16:00 06/09/2025', checkOutTime: '18:00 06/09/2025', status: 'completed' },
];*/}

const StaffManagementPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); 

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [openCheckInModal, setOpenCheckInModal] = useState(false);
    const [openCheckOutModal, setOpenCheckOutModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await staffApi.getDailyBookings();
            setBookings(response.data.bookings); 
            setError('');
        } catch (err) {
            console.error("Failed to fetch bookings:", err);
            setError("Không thể tải danh sách đặt chỗ.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleOpenCheckIn = (booking) => {
        setSelectedBooking(booking);
        setOpenCheckInModal(true);
    };
    const handleOpenCheckOut = (booking) => {
        setSelectedBooking(booking);
        setOpenCheckOutModal(true);
    };

    const handleCheckIn = async () => {
        try {
            await staffApi.checkIn(selectedBooking.id);
            setOpenCheckInModal(false);
            setSuccessMessage(`Check-in cho khách ${selectedBooking.customerName} thành công`);
setOpenSuccessModal(true);
            fetchBookings();
        } catch (err) {
            alert("Check-in thất bại. Vui lòng thử lại.");
            setOpenCheckInModal(false);
        }
    };

    const handleCheckOut = async () => {
        try {
            await staffApi.checkOut(selectedBooking.id);
            setOpenCheckOutModal(false);
            setSuccessMessage(`Check-out cho khách ${selectedBooking.customerName} thành công`);
            setOpenSuccessModal(true);
            fetchBookings();
        } catch (err) {
            alert("Check-out thất bại. Vui lòng thử lại.");
            setOpenCheckOutModal(false);
        }
    };

    const getStatusChip = (status) => {
        if (status === 'confirmed') return <Chip label="Chờ check-in" color="warning" size="small" />;
        if (status === 'checked_in') return <Chip label="Đang sử dụng" color="success" size="small" />;
        if (status === 'completed') return <Chip label="Đã hoàn thành" color="default" size="small" />;
        return <Chip label={status} size="small" />;
    }
    const filteredBookings = useMemo(() => 
        bookings.filter(booking => 
            (booking.customerName && booking.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (booking.podName && booking.podName.toLowerCase().includes(searchTerm.toLowerCase()))
        ), [bookings, searchTerm]);
    
    const handleChangePage = (event, newPage) => setPage(newPage - 1);
    
    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" align="center">{error}</Typography>;
    return (

        <div className="management-container">
            <div className="table-header">
                <Typography variant="h4" className="table-title">
                    DANH SÁCH BOOKING
                </Typography>
            </div>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <TextField
                placeholder="Tìm kiếm theo tên khách hoặc phòng..."
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
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table className="booking-table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header-cell">STT</TableCell>
<TableCell className="table-header-cell">Tên Khách Hàng</TableCell>
                            <TableCell className="table-header-cell">Phòng POD</TableCell>
                            <TableCell className="table-header-cell">Giờ Check-in</TableCell>
                             <TableCell className="table-header-cell">Giờ Check-out</TableCell>
                            <TableCell className="table-header-cell">Trạng Thái</TableCell>
                            <TableCell className="table-header-cell" align="center">Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                        ? filteredBookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : filteredBookings
                        ).map((booking, index) => (
                        <TableRow key={booking.id}>
                                <TableCell className="MuiTableCell-body">{index + 1}</TableCell>
                                <TableCell className="MuiTableCell-body">{booking.customerName}</TableCell>
                                <TableCell className="MuiTableCell-body">{booking.podName}</TableCell>
                                <TableCell className="MuiTableCell-body">{booking.checkInTime}</TableCell>
                                <TableCell className="MuiTableCell-body">{booking.checkOutTime}</TableCell>
                                <TableCell className="MuiTableCell-body">{getStatusChip(booking.status)}</TableCell>
                                <TableCell className="MuiTableCell-body" align="center">
                                    {booking.status === 'confirmed' && (
                                        <Button variant="contained" size="small" onClick={() => handleOpenCheckIn(booking)}>
                                            Check-in
                                        </Button>
                                    )}
                                    {booking.status === 'checked_in' && (
                                        <Button variant="outlined" size="small" color="secondary" onClick={() => handleOpenCheckOut(booking)}>
                                            Check-out
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box className="pagination-container">
            <Pagination 
                count={Math.ceil(filteredBookings.length / rowsPerPage)}
                page={page + 1}
                onChange={handleChangePage}
                color="primary"
                shape="rounded"
            />
        </Box>
            {/* Các Modal */}
            {selectedBooking && (
                <>
<ConfirmationModal open={openCheckInModal} onClose={() => setOpenCheckInModal(false)} onConfirm={handleCheckIn} title={`Xác nhận check-in cho khách ${selectedBooking.customerName}?`} />
                    <ConfirmationModal open={openCheckOutModal} onClose={() => setOpenCheckOutModal(false)} onConfirm={handleCheckOut} title={`Xác nhận check-out cho khách ${selectedBooking.customerName}?`} />
                </>
            )}
            <SuccessModal open={openSuccessModal} onClose={() => setOpenSuccessModal(false)} message={successMessage} primaryActionText="OK" onPrimaryAction={() => setOpenSuccessModal(false)} />
        </div>
    );
};

export default StaffManagementPage;