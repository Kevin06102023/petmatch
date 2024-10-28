// server.js
const mongoose = require('mongoose');
const app = require('./middleware/app.js'); // Importa la configuración de app.js

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/petmatching', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
