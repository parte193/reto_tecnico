const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const auth = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(auth);

// Rutas CRUD para ventas
router.post('/', salesController.createSale);
router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.put('/:id', salesController.updateSale);
router.delete('/:id', salesController.deleteSale);

// Rutas para obtener opciones de listas desplegables
router.get('/options/products', salesController.getProductTypes);
router.get('/options/franchises', salesController.getFranchises);

module.exports = router;