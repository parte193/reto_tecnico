import React from 'react';
import { Typography, Paper, Box, Grid } from '@mui/material';

import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/layout/AppLayout';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <AppLayout title="Dashboard">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido, {user?.nombre || 'Usuario'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Panel de control del sistema de ventas
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 200,
              bgcolor: 'primary.light',
              color: 'white',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total de Ventas
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              {/* Replace with dynamic data */}
              {user?.totalVentas || 'Cargando...'}
            </Typography>
            <Typography variant="body2" sx={{ mt: 'auto' }}>
              Última actualización: Hoy
            </Typography>
          </Paper>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 200,
              bgcolor: 'success.light',
              color: 'white',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Créditos Aprobados
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              {/* Replace with dynamic data */}
              {user?.creditosAprobados || 'Cargando...'}
            </Typography>
            <Typography variant="body2" sx={{ mt: 'auto' }}>
              Última actualización: Hoy
            </Typography>
          </Paper>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 200,
              bgcolor: 'info.light',
              color: 'white',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Tarjetas de Crédito
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2 }}>
              {/* Replace with dynamic data */}
              {user?.tarjetasCredito || 'Cargando...'}
            </Typography>
            <Typography variant="body2" sx={{ mt: 'auto' }}>
              Última actualización: Hoy
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </AppLayout>
  );
};

export default DashboardPage;
