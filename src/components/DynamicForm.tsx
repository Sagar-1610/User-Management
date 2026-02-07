import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { FormFieldConfig } from '../config/formSchema';

interface DynamicFormProps {
  schema: FormFieldConfig[];
  onSubmit: (data: Record<string, string>) => void;
  initialData?: Record<string, string>;
  submitLabel?: string;
  onCancel?: () => void;
}

export const DynamicForm = ({
  schema,
  onSubmit,
  initialData = {},
  submitLabel = 'Submit',
  onCancel,
}: DynamicFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const validateField = (field: FormFieldConfig, value: string): string => {
    if (field.required && !value.trim()) {
      return `${field.label} is required`;
    }

    if (field.validation?.minLength && value.length < field.validation.minLength) {
      return `${field.label} must be at least ${field.validation.minLength} characters`;
    }

    if (field.validation?.maxLength && value.length > field.validation.maxLength) {
      return `${field.label} must be no more than ${field.validation.maxLength} characters`;
    }

    if (field.validation?.pattern && !field.validation.pattern.test(value)) {
      return field.validation.patternMessage || `${field.label} format is invalid`;
    }

    return '';
  };

  const handleChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    const field = schema.find((f) => f.name === fieldName);
    if (field) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    schema.forEach((field) => {
      const value = formData[field.name] || '';
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      onSubmit(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        {schema.map((field) => (
          <Grid item xs={12} sm={6} key={field.name}>
            <TextField
              fullWidth
              name={field.name}
              label={field.label}
              type={field.type}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              error={!!errors[field.name]}
              helperText={errors[field.name] || field.helperText}
              required={field.required}
              placeholder={field.placeholder}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        {onCancel && (
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
        )}
        <Button type="submit" variant="contained" color="primary">
          {submitLabel}
        </Button>
      </Box>
    </Box>
  );
};
