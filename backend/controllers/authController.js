const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { nombre, correo_electronico, contrasena, id_rol } = req.body;
    
    // Verificar si el correo ya existe
    const existingUser = await User.findByEmail(correo_electronico);
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }
    
    // Crear usuario
    const userId = await User.create({
      nombre,
      correo_electronico,
      contrasena,
      id_rol
    });
    
    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      userId 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { correo_electronico, contrasena } = req.body;
    
    // Verificar si el usuario existe
    const user = await User.findByEmail(correo_electronico);
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    
    // Verificar contraseña
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    
    // Generar JWT
    const payload = {
      user: {
        id: user.id,
        nombre: user.nombre,
        rol: user.id_rol
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener perfil de usuario
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener todos los usuarios (solo admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo_electronico, id_rol } = req.body;
    
    const updated = await User.update(id, {
      nombre,
      correo_electronico,
      id_rol
    });
    
    if (!updated) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Cambiar contraseña
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { contrasena } = req.body;
    
    const updated = await User.updatePassword(id, contrasena);
    
    if (!updated) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = await User.delete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};