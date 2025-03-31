const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificar conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida');
    connection.release();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

testConnection();

module.exports = pool;