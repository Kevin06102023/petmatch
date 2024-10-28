const express = require('express');
const routes = require('./routes'); // Importar las rutas definidas
const app = express();

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Uso de las rutas definidas
app.use('/api', routes); // Prefijo opcional de '/api' para todas las rutas

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Algo salió mal!', error: err.message });
});

module.exports = app;
