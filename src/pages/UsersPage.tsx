import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { UserPlus } from 'lucide-react';
import axios from 'axios';

import { UsersTable } from '../components/UsersTable';
import { UserFormModal } from '../components/UserFormModal';



export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}


const API_URL = 'https://user-management-7838.onrender.com/users';



export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);



  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get<User[]>(API_URL);
      setUsers(response.data);
    } catch {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);


  const handleSubmit = async (data: Omit<User, 'id'>) => {
    try {
      if (mode === 'create') {
        await axios.post(API_URL, data);
        setSuccess('User created successfully');
      } else if (selectedUser) {
        await axios.put(`${API_URL}/${selectedUser.id}`, {
          ...data,
          id: selectedUser.id,
        });
        setSuccess('User updated successfully');
      }

      setModalOpen(false);
      loadUsers();
    } catch {
      setError('Operation failed');
    }
  };



  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(`${API_URL}/${deleteId}`);
      setSuccess('User deleted successfully');
      loadUsers();
    } catch {
      setError('Failed to delete user');
    } finally {
      setDeleteOpen(false);
      setDeleteId(null);
    }
  };


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight={600}>
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<UserPlus size={18} />}
          onClick={() => {
            setMode('create');
            setSelectedUser(null);
            setModalOpen(true);
          }}
        >
          Add User
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : (
        <UsersTable
          users={users}
          onEdit={(user) => {
            setMode('edit');
            setSelectedUser(user);
            setModalOpen(true);
          }}
          onDelete={(id) => {
            setDeleteId(id);
            setDeleteOpen(true);
          }}
        />
      )}

      <UserFormModal
        open={modalOpen}
        mode={mode}
        initialData={selectedUser}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess(null)}>
        <Alert severity="success" variant="filled">{success}</Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)}>
        <Alert severity="error" variant="filled">{error}</Alert>
      </Snackbar>
    </Container>
  );
};
