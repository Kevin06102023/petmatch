const jwt = require('jsonwebtoken');

// Middleware para verificar el token
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Token no proporcionado.');
  }

  jwt.verify(token, 'tu_clave_secreta', (err, decoded) => {
    if (err) {
      return res.status(500).send('Error de autenticación.');
    }
    req.userId = decoded.id; // Guarda el ID del usuario en la petición
    next();
  });
};

module.exports = verificarToken;
