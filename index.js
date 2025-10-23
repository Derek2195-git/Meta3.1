const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Importar rutas
const moviesRoutes = require('./routes/movies');
const directorsRoutes = require('./routes/directors');
const actorsRoutes = require('./routes/actors');
const movieActorsRoutes = require('./routes/movieActors');

// Usar rutas
app.use('/api/movies', moviesRoutes);
app.use('/api/directors', directorsRoutes);
app.use('/api/actors', actorsRoutes);
app.use('/api/movies', movieActorsRoutes);

// Endpoint raíz
app.get('/', (req, res) => {
  res.json({ message: '¡Bienvenido a CineBase API!' });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
