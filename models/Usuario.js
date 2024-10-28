const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: false,
  },
  redSocial: {
    type: String,
    required: false,
  },
  nombre: {
    type: String,
    required: true,
  },
  mascotas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mascota',
  }],
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
