const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rutas protegidas
router.get('/profile', auth, authController.getProfile);
router.get('/users', auth, authController.getAllUsers);
router.put('/users/:id', auth, authController.updateUser);
router.put('/users/:id/password', auth, authController.changePassword);
router.delete('/users/:id', auth, authController.deleteUser);

module.exports = router;