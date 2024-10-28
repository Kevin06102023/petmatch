const express = require('express');
const router = express.Router();
const usuariosController = require('./controllers/usuariosController.js');
const mascotasController = require('./controllers/mascotasController.js');
const matchesController = require('./controllers/matchesController.js');
const verificarToken = require('./middleware/verificarToken.js'); // Middleware de autenticación

// Rutas de usuarios
router.post('/usuarios', usuariosController.registrarUsuario);
router.post('/usuarios/login', usuariosController.loginUsuario);

// Rutas de mascotas
router.post('/mascotas', verificarToken, mascotasController.crearMascota);
router.get('/mascotas/:userId', verificarToken, mascotasController.obtenerMascotasPorUsuario);

// Rutas de matches
router.post('/matches', verificarToken, matchesController.hacerMatch);
router.get('/matches/:userId', verificarToken, matchesController.obtenerMatchesPorUsuario);

module.exports = router;
