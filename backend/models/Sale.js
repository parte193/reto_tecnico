const pool = require('../config/db');

const Sale = {
  // Crear una venta
  async create(saleData) {
    const { 
      id_producto_tipo, 
      cupo_solicitado, 
      id_franquicia, 
      tasa, 
      id_usuario_creacion 
    } = saleData;
    
    const [result] = await pool.query(
      `INSERT INTO ventas 
       (id_producto_tipo, cupo_solicitado, id_franquicia, tasa, id_usuario_creacion, id_usuario_actualizacion) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_producto_tipo, cupo_solicitado, id_franquicia, tasa, id_usuario_creacion, id_usuario_creacion]
    );
    
    return result.insertId;
  },
  
  // Obtener todas las ventas
  async getAll() {
    const [rows] = await pool.query(`
      SELECT v.id, pt.nombre as producto, v.cupo_solicitado, 
             f.nombre as franquicia, v.tasa, v.fecha_creacion, 
             u1.nombre as usuario_creacion, v.fecha_actualizacion, 
             u2.nombre as usuario_actualizacion 
      FROM ventas v
      JOIN productos_tipo pt ON v.id_producto_tipo = pt.id
      LEFT JOIN franquicias f ON v.id_franquicia = f.id
      JOIN usuarios u1 ON v.id_usuario_creacion = u1.id
      JOIN usuarios u2 ON v.id_usuario_actualizacion = u2.id
    `);
    return rows;
  },
  
  // Buscar por ID
  async findById(id) {
    const [rows] = await pool.query(`
      SELECT v.id, v.id_producto_tipo, pt.nombre as producto, 
             v.cupo_solicitado, v.id_franquicia, f.nombre as franquicia, 
             v.tasa, v.fecha_creacion, v.id_usuario_creacion, 
             u1.nombre as usuario_creacion, v.fecha_actualizacion, 
             v.id_usuario_actualizacion, u2.nombre as usuario_actualizacion 
      FROM ventas v
      JOIN productos_tipo pt ON v.id_producto_tipo = pt.id
      LEFT JOIN franquicias f ON v.id_franquicia = f.id
      JOIN usuarios u1 ON v.id_usuario_creacion = u1.id
      JOIN usuarios u2 ON v.id_usuario_actualizacion = u2.id
      WHERE v.id = ?
    `, [id]);
    return rows[0];
  },
  
  // Actualizar venta
  async update(id, saleData, id_usuario_actualizacion) {
    const { 
      id_producto_tipo, 
      cupo_solicitado, 
      id_franquicia, 
      tasa
    } = saleData;
    
    const [result] = await pool.query(
      `UPDATE ventas 
       SET id_producto_tipo = ?, cupo_solicitado = ?, id_franquicia = ?, 
           tasa = ?, id_usuario_actualizacion = ? 
       WHERE id = ?`,
      [id_producto_tipo, cupo_solicitado, id_franquicia, tasa, id_usuario_actualizacion, id]
    );
    
    return result.affectedRows > 0;
  },
  
  // Eliminar venta
  async delete(id) {
    const [result] = await pool.query('DELETE FROM ventas WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
  
  // Obtener tipos de productos
  async getProductTypes() {
    const [rows] = await pool.query('SELECT * FROM productos_tipo');
    return rows;
  },
  
  // Obtener franquicias
  async getFranchises() {
    const [rows] = await pool.query('SELECT * FROM franquicias');
    return rows;
  }
};

module.exports = Sale;