import { SetStateAction, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import { 
  getSales, 
  createSale, 
  updateSale, 
  deleteSale,
  getProductTypes,
  getFranchises
} from '../api/salesService';
import { Sale, SaleFormData, ProductType, Franchise } from '../types';
import AppLayout from '../components/layout/AppLayout';
import { formatCurrency, formatRate, formatDate } from '../utils/formatUtils';

const SalesManagementPage: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [formData, setFormData] = useState<SaleFormData>({
    id_producto_tipo: '',
    cupo_solicitado: '',
    id_franquicia: '',
    tasa: '',
  });
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [franchises, setFranchises] = useState<Franchise[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchSales();
    fetchProductTypes();
    fetchFranchises();
  }, []);

  const fetchSales = async () => {
    const data = await getSales();
    setSales(data);
  };

  const fetchProductTypes = async () => {
    const data = await getProductTypes();
    setProductTypes(data);
  };

  const fetchFranchises = async () => {
    const data = await getFranchises();
    setFranchises(data);
  };

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  const handleOpenDialog = (sale: Sale | null = null) => {
    setEditingSale(sale);
    setFormData(
      sale
        ? {
            id_producto_tipo: sale.id_producto_tipo?.toString() || '',
            cupo_solicitado: sale.cupo_solicitado ? formatCurrency(sale.cupo_solicitado) : '',
            id_franquicia: sale.id_franquicia?.toString() || '',
            tasa: sale.tasa ? formatRate(sale.tasa) : '',
          }
        : {
            id_producto_tipo: '',
            cupo_solicitado: '',
            id_franquicia: '',
            tasa: '',
          }
    );
    setErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSale(null);
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    
    // Formateo especial para el campo cupo_solicitado
    if (name === 'cupo_solicitado') {
      const numericValue = value.replace(/\./g, '').replace(/\D/g, '');
      const formattedValue = numericValue ? formatCurrency(numericValue) : '';
      setFormData({ ...formData, [name]: formattedValue });
    } 
    // Formateo especial para el campo tasa
    else if (name === 'tasa') {
      // Permitir solo números y un punto decimal
      const rateValue = value.replace(/[^\d.]/g, '');
      // Asegurar que solo haya un punto decimal
      const parts = rateValue.split('.');
      const formattedRate = parts.length > 1 
        ? `${parts[0]}.${parts.slice(1).join('')}` 
        : rateValue;
      setFormData({ ...formData, [name]: formattedRate });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }

    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    // Validar tipo de producto
    if (!formData.id_producto_tipo) {
      newErrors.id_producto_tipo = 'El tipo de producto es obligatorio';
    }
    
    // Validar cupo solicitado
    if (!formData.cupo_solicitado) {
      newErrors.cupo_solicitado = 'El cupo solicitado es obligatorio';
    }
    
    // Validar franquicia para tarjetas de crédito
    if (formData.id_producto_tipo === '3' && !formData.id_franquicia) {
      newErrors.id_franquicia = 'La franquicia es obligatoria para tarjetas de crédito';
    }
    
    // Validar tasa para créditos y libranzas
    if (['1', '2'].includes(formData.id_producto_tipo) && !formData.tasa) {
      newErrors.tasa = 'La tasa es obligatoria para este tipo de producto';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      if (editingSale && editingSale.id) {
        await updateSale(editingSale.id, formData);
      } else {
        await createSale(formData);
      }
      fetchSales();
      handleCloseDialog();
    } catch (error) {
      console.error('Error al guardar venta:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta venta?')) {
      await deleteSale(id);
      fetchSales();
    }
  };

  const filteredSales = sales.filter((sale) => {
    return (
      sale.producto.toLowerCase().includes(search.toLowerCase()) ||
      (sale.usuario_creacion && 
       sale.usuario_creacion.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // Función para determinar si mostrar campos específicos según el tipo de producto
  const shouldShowFranchise = formData.id_producto_tipo === '3';
  const shouldShowRate = ['1', '2'].includes(formData.id_producto_tipo);

  return (
    <AppLayout title="Ventas">
      <div>
        <h1>Gestión de Ventas</h1>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
          <TextField
            label="Buscar por producto o usuario"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            fullWidth
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleOpenDialog()}
          >
            Registrar Venta
          </Button>
        </Box>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Cupo Solicitado</TableCell>
                <TableCell>Franquicia</TableCell>
                <TableCell>Tasa</TableCell>
                <TableCell>Fecha de Creación</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.id}</TableCell>
                  <TableCell>{sale.producto}</TableCell>
                  <TableCell>$ {formatCurrency(sale.cupo_solicitado)}</TableCell>
                  <TableCell>{sale.franquicia || 'N/A'}</TableCell>
                  <TableCell>{sale.tasa ? `${formatRate(sale.tasa)}%` : 'N/A'}</TableCell>
                  <TableCell>{formatDate(sale.fecha_creacion)}</TableCell>
                  <TableCell>{sale.usuario_creacion}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog(sale)}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        if (sale.id !== undefined) {
                          handleDelete(sale.id);
                        }
                      }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredSales.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No hay ventas registradas
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {editingSale ? 'Editar Venta' : 'Registrar Nueva Venta'}
          </DialogTitle>
          <DialogContent>
            <FormControl 
              fullWidth 
              margin="normal" 
              error={!!errors.id_producto_tipo}
            >
              <InputLabel>Producto</InputLabel>
              <Select
                name="id_producto_tipo"
                value={formData.id_producto_tipo}
                onChange={handleChange}
                label="Producto"
              >
                {productTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.nombre}
                  </MenuItem>
                ))}
              </Select>
              {errors.id_producto_tipo && (
                <FormHelperText>{errors.id_producto_tipo}</FormHelperText>
              )}
            </FormControl>
            
            <TextField
              label="Cupo Solicitado"
              name="cupo_solicitado"
              value={formData.cupo_solicitado}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              error={!!errors.cupo_solicitado}
              helperText={errors.cupo_solicitado}
            />
            
            {shouldShowFranchise && (
              <FormControl 
                fullWidth 
                margin="normal"
                error={!!errors.id_franquicia}
              >
                <InputLabel>Franquicia</InputLabel>
                <Select
                  name="id_franquicia"
                  value={formData.id_franquicia}
                  onChange={handleChange}
                  label="Franquicia"
                >
                  {franchises.map((franchise) => (
                    <MenuItem key={franchise.id} value={franchise.id}>
                      {franchise.nombre}
                    </MenuItem>
                  ))}
                </Select>
                {errors.id_franquicia && (
                  <FormHelperText>{errors.id_franquicia}</FormHelperText>
                )}
              </FormControl>
            )}
            
            {shouldShowRate && (
              <TextField
                label="Tasa"
                name="tasa"
                value={formData.tasa}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                placeholder="Ej: 10.58"
                error={!!errors.tasa}
                helperText={errors.tasa || "Ingrese la tasa con máximo 2 decimales"}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="inherit">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained">
              {editingSale ? 'Actualizar' : 'Guardar'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default SalesManagementPage;