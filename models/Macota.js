const mongoose = require('mongoose');

const MascotaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  especie: {
    type: String,
    required: true,
  },
  raza: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  personalidad: {
    type: String,
    required: false,
  },
  intereses: {
    type: String,
    required: false,
  },
  estadoSalud: {
    type: String,
    required: false,
  },
  ubicacion: {
    latitud: {
      type: Number,
      required: true,
    },
    longitud: {
      type: Number,
      required: true,
    },
  },
  fotos: [{
    type: String, // URL de la foto
    required: false,
  }],
  videos: [{
    type: String, // URL del video
    required: false,
  }],
  dueno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  preferencias: {
    tipo: {
      type: String, // Puede ser "amigos" o "pareja"
      required: true,
    },
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Mascota', MascotaSchema);
