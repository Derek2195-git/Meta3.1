const movies = require('../datos/movies');
const actors = require('../datos/actors');
const movieActors = require('../datos/movieActors');

const addActorToMovie = (req, res) => {
  const movieId = req.params.movieId;
  const { actorId, characterName } = req.body;

  // Validar campos
  if (!actorId || !characterName) {
    return res.status(400).json({ message: "Faltan campos obligatorios: actorId, characterName." });
  }

  // Verificar que la película exista
  const movie = movies.find(m => m.id === movieId);
  if (!movie) return res.status(404).json({ message: "Película no encontrada." });

  // Verificar que el actor exista
  const actor = actors.find(a => a.id === actorId);
  if (!actor) return res.status(422).json({ message: "actorId no existe." });

  // Verificar si la relación ya existe
  const exists = movieActors.find(ma => ma.movieId === movieId && ma.actorId === actorId);
  if (exists) return res.status(409).json({ message: "El actor ya está agregado a esta película." });

  const newRelation = { movieId, actorId, characterName };
  movieActors.push(newRelation);

  res.status(201).json(newRelation);
};

const getMovieActors = (req, res) => {
  const movieId = req.params.movieId;

  // Verificar que la película exista
  const movie = movies.find(m => m.id === movieId);
  if (!movie) return res.status(404).json({ message: "Película no encontrada." });

  // Filtrar relaciones
  const relations = movieActors.filter(ma => ma.movieId === movieId);

  if (relations.length === 0) {
    return res.status(404).json({ message: "No hay actores registrados para esta película." });
  }

  // Mapear a objetos completos de actores con nombre de personaje
  const result = relations.map(rel => {
    const actor = actors.find(a => a.id === rel.actorId);
    return actor ? { ...actor, characterName: rel.characterName } : null;
  }).filter(Boolean);

  res.json(result);
};

module.exports = { addActorToMovie, getMovieActors };
