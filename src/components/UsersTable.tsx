import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';
import { User } from '../types/user';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const UsersTable = ({ users, onEdit, onDelete }: UsersTableProps) => {
  if (users.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px',
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No users found. Add your first user to get started.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.100' }}>
            <TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Phone Number</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{
                '&:hover': { bgcolor: 'grey.50' },
                transition: 'background-color 0.2s',
              }}
            >
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onEdit(user)}
                    aria-label="edit user"
                  >
                    <Edit size={18} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(user.id)}
                    aria-label="delete user"
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
