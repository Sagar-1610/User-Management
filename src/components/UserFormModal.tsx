import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from '@mui/material';
import { X } from 'lucide-react';
import { DynamicForm } from './DynamicForm';
import { userFormSchema } from '../config/formSchema';


interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, string>) => void;
  initialData?: User | null;
  mode: 'create' | 'edit';
}

export const UserFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
  mode,
}: UserFormModalProps) => {
  const handleSubmit = (data: Record<string, string>) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <DialogTitle sx={{ flex: 1 }}>
          {mode === 'create' ? 'Add New User' : 'Edit User'}
        </DialogTitle>
        <IconButton
          onClick={onClose}
          sx={{ mr: 2 }}
          aria-label="close"
        >
          <X size={20} />
        </IconButton>
      </Box>
      <DialogContent>
        <DynamicForm
          schema={userFormSchema}
          onSubmit={handleSubmit}
          initialData={initialData || {}}
          submitLabel={mode === 'create' ? 'Add User' : 'Update User'}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
