const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Nuestras "Bases de Datos" en Memoria
let movies = [];
let directors = [];
let actors = [];
let movieActors = [];

// Datos de ejemplo para empezar
directors.push(
  {
    id: "dir_mx_001",
    name: "Alfonso Cuarón",
    nationality: "Mexicano",
    birthYear: 1961,
    birthPlace: "Ciudad de México",
    notableAwards: ["2 Óscares", "3 Premios BAFTA", "Globo de Oro"]
  }
);

actors.push(
  {
    id: "act_mx_001", 
    name: "Gael García Bernal",
    nationality: "Mexicano",
    birthYear: 1978,
    birthPlace: "Guadalajara, Jalisco",
    notableAwards: ["Premio del Festival de Cannes", "2 Premios BAFTA"]
  },
  {
    id: "act_mx_002",
    name: "Diego Luna", 
    nationality: "Mexicano",
    birthYear: 1979,
    birthPlace: "Toluca, Estado de México",
    notableAwards: ["Premio Marcello Mastroianni", "Diosa de Plata"]
  }
);

movies.push(
  {
    id: "mx_001",
    title: "Y tu mamá también",
    releaseYear: 2001,
    genre: ["Drama", "Road Movie", "Coming of Age"],
    duration: 105,
    directorId: "dir_mx_001",
    rating: 7.7,
    language: "Español",
    country: "México"
  }
);

movieActors.push(
  { movieId: "mx_001", actorId: "act_mx_001", characterName: "Julio Zapata" },
  { movieId: "mx_001", actorId: "act_mx_002", characterName: "Tenoch Iturbide" }
);

// Endpoint de bienvenida
app.get('/', (req, res) => {
  res.json({ message: '¡Bienvenido a CineBase API - Tu base de datos cinematográfica!' });
});

app.listen(PORT, () => {
  console.log(`Servidor CineBase ejecutándose en http://localhost:${PORT}`);
});
