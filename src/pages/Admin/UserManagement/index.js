import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, Paper, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TablePagination, Pagination  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './UserManagement.css';
import SuccessModal from './components/SuccessModal';
import { useNavigate } from 'react-router-dom'; 
import AddUserModal from './components/AddUserModal';
import EditUserModal from './components/EditUserModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

const initialUsers = [
    { id: 1, fullName: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', role: 'Quản lý' },
    { id: 2, fullName: 'Trần Thị B', email: 'tranthib@gmail.com', role: 'Khách hàng' },
    { id: 3, fullName: 'Lê Văn C', email: 'levanc@gmail.com', role: 'Nhân viên' },
    { id: 4, fullName: 'Phạm Thị D', email: 'phamthid@gmail.com', role: 'Khách hàng' },
    { id: 5, fullName: 'Hoàng Văn E', email: 'hoangvane@gmail.com', role: 'Khách hàng' },
    { id: 6, fullName: 'Vũ Thị F', email: 'vuthif@gmail.com', role: 'Nhân viên' },
];

const UserManagementPage = () => {
    const [users, setUsers] = useState(initialUsers);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [newlyAddedUser, setNewlyAddedUser] = useState(null);
    const navigate = useNavigate();
    const [editFormData, setEditFormData] = useState({ id: null, fullName: '', email: '', role: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const filteredUsers = useMemo(() => 
        users.filter(user => 
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        ), [users, searchTerm]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditFormData({ 
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        });
        setOpenEditModal(true);
    };
    
    const handleDelete = (user) => {
        setSelectedUser(user);
        setOpenDeleteModal(true);
    };
    
    const confirmDelete = () => {
        setUsers(users.filter(user => user.id !== selectedUser.id));
        setOpenDeleteModal(false);
        setNewlyAddedUser(null);
        setSuccessMessage(`ĐÃ XÓA NGƯỜI DÙNG: ${selectedUser.fullName}`);
        setOpenSuccessModal(true);
    };

    const handleSaveNewUser = (newUser) => {
        const userWithId = { id: Date.now(), ...newUser };
        setUsers(currentUsers => [...currentUsers, userWithId]);
        setNewlyAddedUser(userWithId);
        setOpenAddModal(false);
        setSuccessMessage('THÊM NGƯỜI DÙNG THÀNH CÔNG');
        setOpenSuccessModal(true); 
    };
    
    const handleSaveUpdatedUser = (updatedUser) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setOpenEditModal(false);
        setNewlyAddedUser(null);
        setSuccessMessage('CẬP NHẬT NGƯỜI DÙNG THÀNH CÔNG');
        setOpenSuccessModal(true);
    };
    const handleNavigateAfterSuccess = () => {
        setOpenSuccessModal(false);
        if (newlyAddedUser) {
            navigate(`/admin/users/${newlyAddedUser.id}`, { state: { user: newlyAddedUser } });
        }
    };


    return (
        <div className="user-management-container">
            <div className="table-header">
                <Box sx={{ width: 100 }} /> 
                <Typography variant="h4" className="table-title">
                    DANH SÁCH NGƯỜI DÙNG
                </Typography>
                <Button 
                    variant="contained" 
                    startIcon={<AddIcon />} 
                    onClick={() => setOpenAddModal(true)}
                    className="add-button"
                >
                    Thêm
                </Button>
            </div>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <TextField
                    variant="outlined"
                    placeholder="Tìm kiếm theo tên, email, vai trò..."
                    fullWidth
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{  }}
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
                                <TableCell className="table-header-cell">Họ và tên</TableCell>
                                <TableCell className="table-header-cell">Email</TableCell>
                                <TableCell className="table-header-cell">Vai trò</TableCell>
                                <TableCell className="table-header-cell">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filteredUsers
                            ).map((user, index) => (
                                <TableRow key={user.id}>
                                    <TableCell className="MuiTableCell-body">{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell className="MuiTableCell-body">{user.fullName}</TableCell>
                                    <TableCell className="MuiTableCell-body">{user.email}</TableCell>
                                    <TableCell className="MuiTableCell-body">{user.role}</TableCell>
                                    <TableCell className="MuiTableCell-body">
                                        <IconButton size="small" onClick={() => handleEdit(user)} color="primary"> 
                < EditIcon />
                </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(user)} color="error"> 
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
                        count={Math.ceil(filteredUsers.length / rowsPerPage)} 
                        page={page + 1} 
                        onChange={(event, value) => setPage(value - 1)} 
                        color="primary"
                        shape="rounded"
                    />
                </Box>

                <AddUserModal 
                    open={openAddModal} 
                    onClose={() => setOpenAddModal(false)}
                    onSave={handleSaveNewUser}
                />
                {selectedUser && (
                    <EditUserModal 
                        open={openEditModal} 
                        onClose={() => setOpenEditModal(false)}
                        user={selectedUser}
                        onSave={handleSaveUpdatedUser}
                    />
                )}
                {selectedUser && (
                    <DeleteConfirmationModal 
                        open={openDeleteModal}
                        onClose={() => setOpenDeleteModal(false)}
                        onConfirm={confirmDelete}
                        userName={selectedUser.fullName}
                    />
                )}
                <SuccessModal 
                    open={openSuccessModal}
                    onClose={() => setOpenSuccessModal(false)}
                    message={successMessage}
                    primaryActionText={newlyAddedUser ? "Xem chi tiết" : "Quay lại"}
                    onPrimaryAction={newlyAddedUser ? handleNavigateAfterSuccess : () => setOpenSuccessModal(false)}
                    secondaryActionText={newlyAddedUser ? "Quay lại" : null}
                    onSecondaryAction={() => setOpenSuccessModal(false)}
                />
            </div>
    );
};

export default UserManagementPage;