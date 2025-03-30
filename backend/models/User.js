const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  // Crear un usuario
  async create(userData) {
    const { nombre, correo_electronico, contrasena, id_rol } = userData;
    
    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);
    
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, correo_electronico, contrasena, id_rol) VALUES (?, ?, ?, ?)',
      [nombre, correo_electronico, hashedPassword, id_rol]
    );
    
    return result.insertId;
  },
  
  // Buscar por email
  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [email]);
    return rows[0];
  },
  
  // Buscar por ID
  async findById(id) {
    const [rows] = await pool.query('SELECT id, nombre, correo_electronico, id_rol, fecha_creacion, fecha_actualizacion FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  },
  
  // Obtener todos los usuarios
  async getAll() {
    const [rows] = await pool.query(`
      SELECT u.id, u.nombre, u.correo_electronico, r.nombre as rol, u.fecha_creacion, u.fecha_actualizacion 
      FROM usuarios u 
      JOIN roles r ON u.id_rol = r.id
    `);
    return rows;
  },
  
  // Actualizar usuario
  async update(id, userData) {
    const { nombre, correo_electronico, id_rol } = userData;
    
    const [result] = await pool.query(
      'UPDATE usuarios SET nombre = ?, correo_electronico = ?, id_rol = ? WHERE id = ?',
      [nombre, correo_electronico, id_rol, id]
    );
    
    return result.affectedRows > 0;
  },
  
  // Actualizar contraseña
  async updatePassword(id, contrasena) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);
    
    const [result] = await pool.query(
      'UPDATE usuarios SET contrasena = ? WHERE id = ?',
      [hashedPassword, id]
    );
    
    return result.affectedRows > 0;
  },
  
  // Eliminar usuario
  async delete(id) {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = User;