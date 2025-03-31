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
} from '@mui/material';
import { getUsers, createUser, updateUser, deleteUser } from '../api/userService';
import { User, UserFormData } from '../types';
import AppLayout from '../components/layout/AppLayout';

const UserManagementPage: React.FC = () => {

const [users, setUsers] = useState<User[]>(() => []);
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    nombre: '',
    correo_electronico: '',
    contrasena: '',
    id_rol: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleSearch = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearch(e.target.value);
  };

const handleOpenDialog = (user: User | null = null) => {
    setEditingUser(user);
setFormData(
  user
    ? {
        nombre: user.nombre,
        correo_electronico: user.correo_electronico,
        contrasena: '',
        id_rol: user.rol.toString(),
      }
    : {
        nombre: '',
        correo_electronico: '',
        contrasena: '',
        id_rol: '',
      }
);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
  };

const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (editingUser) {
if (editingUser?.id !== undefined) {
  await updateUser(editingUser.id, { ...formData, rol: parseInt(formData.id_rol) });
}
    } else {
      await createUser({ ...formData, rol: parseInt(formData.id_rol) });
    }
    fetchUsers();
    handleCloseDialog();
  };

const handleDelete = async (id: number) => {
    if (id !== undefined) {
      await deleteUser(id);
    }
    fetchUsers();
  };

const filteredUsers = Array.isArray(users) ? users.filter((user: User) => {
    return user.nombre.toLowerCase().includes(search.toLowerCase());
  }) : [];

  return (
    <AppLayout title="Users">
    <div>
      <h1>Gestión de Usuarios</h1>
      <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
      <TextField
        label="Buscar usuarios"
        variant="outlined"
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Crear Usuario
      </Button>
      </Box>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo Electrónico</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
{filteredUsers.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.nombre}</TableCell>
                <TableCell>{user.correo_electronico}</TableCell>
                <TableCell>{user.rol}</TableCell>
<TableCell>{user.fecha_creacion || 'N/A'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(user)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                  onClick={() => {
                    if (user.id !== undefined) {
                      handleDelete(user.id);
                    }
                  }}
                    style={{ marginLeft: '10px' }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingUser ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correo Electrónico"
            name="correo_electronico"
            value={formData.correo_electronico}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {!editingUser && (
            <TextField
              label="Contraseña"
              name="contrasena"
              type="password"
              value={formData.contrasena}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          )}
          <FormControl fullWidth margin="normal">
            <InputLabel>Rol</InputLabel>
            <Select
              name="id_rol"
              value={formData.id_rol}
              onChange={handleChange}
            >
              <MenuItem value={1}>Administrador</MenuItem>
              <MenuItem value={2}>Asesor</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingUser ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </AppLayout>
  );
};

export default UserManagementPage;
