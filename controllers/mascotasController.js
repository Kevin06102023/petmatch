const Mascota = require('../models/Mascota');

// Crear mascota
const crearMascota = async (req, res) => {
  try {
    const { nombre, especie, raza, edad, genero, personalidad, intereses, estadoSalud, ubicacion, fotos, videos, preferencias } = req.body;
    const userId = req.userId; // Obtenido del middleware de autenticación

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

    await nuevaMascota.save();
    res.status(201).json({ mensaje: 'Mascota creada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la mascota', error });
  }
};

// Obtener mascotas por usuario
const obtenerMascotasPorUsuario = async (req, res) => {
  try {
    const mascotas = await Mascota.find({ dueno: req.params.userId });
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las mascotas', error });
  }
};

module.exports = {
  crearMascota,
  obtenerMascotasPorUsuario,
};
