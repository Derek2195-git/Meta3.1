const actors = require('../datos/actors');
const movies = require('../datos/movies');
const movieActors = require('../datos/movieActors');

// Obtener todos los actores con filtros opcionales
const getAllActors = (req, res) => {
  const { nationality, minBirthYear } = req.query;
  let filteredActors = [...actors];

  if (nationality) {
    filteredActors = filteredActors.filter(a =>
      a.nationality.toLowerCase() === nationality.toLowerCase()
    );
  }

  if (minBirthYear) {
    filteredActors = filteredActors.filter(a =>
      a.birthYear >= parseInt(minBirthYear)
    );
  }

  if (filteredActors.length === 0) {
    return res.status(404).json({ message: "No se encontraron actores con esos criterios." });
  }

  res.json(filteredActors);
};

// Obtener todas las películas de un actor específico
const getActorMovies = (req, res) => {
  const actorId = req.params.id;

  // Verificar que el actor exista
  const actor = actors.find(a => a.id === actorId);
  if (!actor) return res.status(404).json({ message: "Actor no encontrado." });

  // Buscar relaciones en movieActors
  const actorMovieRelations = movieActors.filter(ma => ma.actorId === actorId);

  if (actorMovieRelations.length === 0) {
    return res.status(404).json({ message: "Este actor no tiene películas registradas." });
  }

  // Obtener los datos completos de cada película
  const actorMovies = actorMovieRelations.map(rel => {
    return movies.find(m => m.id === rel.movieId);
  }).filter(Boolean); // eliminar undefined si alguna película no existe

  res.json(actorMovies);
};

const createActor = (req, res) => {
  const { id, name, nationality, birthYear, birthPlace, notableAwards } = req.body;

  // Validar campos obligatorios
  if (!id || !name || !nationality || !birthYear) {
    return res.status(400).json({ message: "Faltan campos obligatorios." });
  }

  // Verificar que el actor no exista
  const exists = actors.find(a => a.id === id);
  if (exists) return res.status(409).json({ message: "El actor ya existe." });

  const newActor = {
    id,
    name,
    nationality,
    birthYear,
    birthPlace: birthPlace || "",
    notableAwards: notableAwards || []
  };

  actors.push(newActor);
  res.status(201).json(newActor);
};

module.exports = { getAllActors, getActorMovies, createActor };
