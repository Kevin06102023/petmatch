const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Modelos de Mongoose
const Usuario = require('./models/Usuario');
const Mascota = require('./models/Mascota');
const Match = require('./models/Match'); // Asegúrate de tener el modelo de Match definido en models/Match.js

// Función para registrar usuarios
const registrarUsuario = async (data) => {
  const { email, password, telefono, redSocial, nombre } = data;

  // Verificar si el usuario ya existe
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    throw new Error('El usuario ya existe');
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear el nuevo usuario
  const nuevoUsuario = new Usuario({
    email,
    password: hashedPassword,
    telefono,
    redSocial,
    nombre,
  });

  // Guardar el usuario y generar token
  const usuarioGuardado = await nuevoUsuario.save();
  const token = jwt.sign({ id: usuarioGuardado._id }, 'tu_clave_secreta', { expiresIn: '1h' });

  return { usuario: usuarioGuardado, token };
};

// Función para crear perfil de mascota
const crearMascota = async (data, userId) => {
  const { nombre, especie, raza, edad, genero, personalidad, intereses, estadoSalud, ubicacion, fotos, videos, preferencias } = data;

  // Verificar que el dueño existe
  const usuario = await Usuario.findById(userId);
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  // Crear la nueva mascota
  const nuevaMascota = new Mascota({
    nombre,
    especie,
    raza,
    edad,
    genero,
    personalidad,
    intereses,
    estadoSalud,
    ubicacion,
    fotos,
    videos,
    dueno: userId,
    preferencias,
  });

  return await nuevaMascota.save();
};

// Función para obtener mascotas cercanas (geolocalización)
const obtenerMascotasCercanas = async (lat, lng) => {
  // Calcular distancia y filtrar mascotas
  return await Mascota.find({
    'ubicacion.latitud': { $gte: lat - 0.1, $lte: lat + 0.1 },
    'ubicacion.longitud': { $gte: lng - 0.1, $lte: lng + 0.1 },
  });
};

// Función para hacer "match" entre mascotas
const hacerMatch = async (mascota1Id, mascota2Id) => {
  const mascota1 = await Mascota.findById(mascota1Id);
  const mascota2 = await Mascota.findById(mascota2Id);

  if (!mascota1 || !mascota2) {
    throw new Error('Una o ambas mascotas no existen');
  }

  // Crear un nuevo "match"
  const nuevoMatch = new Match({
    mascota1: mascota1Id,
    mascota2: mascota2Id,
    fechaMatch: new Date(),
    estado: 'pendiente',
  });

  return await nuevoMatch.save();
};

// Exportar funciones
module.exports = {
  registrarUsuario,
  crearMascota,
  obtenerMascotasCercanas,
  hacerMatch,
};
