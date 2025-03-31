import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';


const LoginPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src="./image_dollar.png" alt="dollar" width={100} height={100} />
        </Box>
        <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
          Sistema de Ventas
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
};

export default LoginPage;