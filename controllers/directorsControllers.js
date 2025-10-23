const directors = require('../datos/directors');
const movies = require('../datos/movies');

// Obtener todos los directores con filtros opcionales
const getAllDirectors = (req, res) => {
  const { nationality, minBirthYear } = req.query;
  let filteredDirectors = [...directors];

  if (nationality) {
    filteredDirectors = filteredDirectors.filter(d =>
      d.nationality.toLowerCase() === nationality.toLowerCase()
    );
  }

  if (minBirthYear) {
    filteredDirectors = filteredDirectors.filter(d =>
      d.birthYear >= parseInt(minBirthYear)
    );
  }

  if (filteredDirectors.length === 0) {
    return res.status(404).json({ message: "No se encontraron directores con esos criterios." });
  }

  res.json(filteredDirectors);
};

// Obtener todas las películas de un director específico
const getDirectorMovies = (req, res) => {
  const directorId = req.params.id;

  // Verificar que el director exista
  const director = directors.find(d => d.id === directorId);
  if (!director) return res.status(404).json({ message: "Director no encontrado." });

  // Filtrar películas de este director
  const directorMovies = movies.filter(m => m.directorId === directorId);

  if (directorMovies.length === 0) {
    return res.status(404).json({ message: "Este director no tiene películas registradas." });
  }

  res.json(directorMovies);
};

const createDirector = (req, res) => {
  const { id, name, nationality, birthYear, birthPlace, notableAwards } = req.body;

  // Validar campos obligatorios
  if (!id || !name || !nationality || !birthYear) {
    return res.status(400).json({ message: "Faltan campos obligatorios: id, name, nationality, birthYear." });
  }

  // Verificar que el director no exista
  const exists = directors.find(d => d.id === id);
  if (exists) return res.status(409).json({ message: "El director ya existe." });

  const newDirector = {
    id,
    name,
    nationality,
    birthYear,
    birthPlace: birthPlace || "",
    notableAwards: notableAwards || []
  };

  directors.push(newDirector);
  res.status(201).json(newDirector);
};


module.exports = { getAllDirectors, getDirectorMovies, createDirector };
