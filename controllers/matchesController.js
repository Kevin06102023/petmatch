const Match = require('../models/Match');

// Crear un match
const hacerMatch = async (req, res) => {
  try {
    const { mascota1Id, mascota2Id } = req.body;

    const nuevoMatch = new Match({
      mascota1: mascota1Id,
      mascota2: mascota2Id,
    });

    await nuevoMatch.save();
    res.status(201).json({ mensaje: 'Match creado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el match', error });
  }
};

// Obtener matches de un usuario
const obtenerMatchesPorUsuario = async (req, res) => {
  try {
    const matches = await Match.find({
      $or: [
        { mascota1: req.params.userId },
        { mascota2: req.params.userId },
      ],
    }).populate('mascota1 mascota2');
    res.json(matches);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los matches', error });
  }
};

module.exports = {
  hacerMatch,
  obtenerMatchesPorUsuario,
};
