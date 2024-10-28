const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
const registrarUsuario = async (req, res) => {
  try {
    const { email, password, telefono, redSocial, nombre } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({
      email,
      password: hashedPassword,
      telefono,
      redSocial,
      nombre,
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el registro', error });
  }
};

// Login usuario
const loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  const esValido = await bcrypt.compare(password, usuario.password);
  if (!esValido) {
    return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
  }

  const token = jwt.sign({ id: usuario._id }, 'tu_clave_secreta', { expiresIn: '1h' });
  res.json({ token });
};

module.exports = {
  registrarUsuario,
  loginUsuario,
};
