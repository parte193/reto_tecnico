import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Alert, Box, Paper, Typography } from '@mui/material';
import { loginSchema, LoginFormData } from '../../schemas/authSchemas';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    correo_electronico: '',
    contrasena: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Limpiar error al editar
    if (errors[name as keyof LoginFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error) {
        // Si es un error de Zod, extraemos los errores de validación
        if (error.name === 'ZodError') {
          const zodError = JSON.parse(error.message);
          const newErrors: Partial<LoginFormData> = {};
          
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          zodError.forEach((err: { path: any[]; message: string | undefined; }) => {
            const path = err.path[0];
            newErrors[path as keyof LoginFormData] = err.message;
          });
          
          setErrors(newErrors);
        }
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await login(formData);
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError('Error al iniciar sesión');
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3 }}>
        Iniciar Sesión
      </Typography>
      
      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="correo_electronico"
          label="Correo Electrónico"
          name="correo_electronico"
          autoComplete="email"
          autoFocus
          value={formData.correo_electronico}
          onChange={handleChange}
          error={!!errors.correo_electronico}
          helperText={errors.correo_electronico}
          disabled={isLoading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="contrasena"
          label="Contraseña"
          type="password"
          id="contrasena"
          autoComplete="current-password"
          value={formData.contrasena}
          onChange={handleChange}
          error={!!errors.contrasena}
          helperText={errors.contrasena}
          disabled={isLoading}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;