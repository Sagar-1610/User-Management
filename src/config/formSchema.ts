export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'date';
  required: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    patternMessage?: string;
  };
  placeholder?: string;
  helperText?: string;
}

export const userFormSchema: FormFieldConfig[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    validation: {
      minLength: 2,
    },
    placeholder: 'Enter first name',
    helperText: 'Minimum 2 characters',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    validation: {
      minLength: 2,
    },
    placeholder: 'Enter last name',
    helperText: 'Minimum 2 characters',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    required: true,
    validation: {
      pattern: /^[0-9]{10}$/,
      patternMessage: 'Phone number must be exactly 10 digits',
    },
    placeholder: '1234567890',
    helperText: '10 digit phone number',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    validation: {
      pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      patternMessage: 'Please enter a valid email address',
    },
    placeholder: 'user@example.com',
    helperText: 'Valid email format required',
  },
];
