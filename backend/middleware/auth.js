const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Obtener token del header
  const token = req.header('x-auth-token');
  
  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ message: 'No hay token, autorización denegada' });
  }
  
  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Añadir usuario al objeto request
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token no válido' });
  }
};