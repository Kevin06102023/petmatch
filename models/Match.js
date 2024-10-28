const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  mascota1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mascota',
    required: true,
  },
  mascota2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mascota',
    required: true,
  },
  fechaMatch: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'aceptado', 'rechazado'],
    default: 'pendiente',
  },
});

module.exports = mongoose.model('Match', MatchSchema);
