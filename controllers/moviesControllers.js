const movies = require('../datos/movies');
const directors = require('../datos/directors');

// Obtener todas las películas
const getAllMovies = (req, res) => {
  const { genre, minRating, minYear, maxYear } = req.query;
  let filteredMovies = [...movies];

  if (genre) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
  }
  if (minRating) filteredMovies = filteredMovies.filter(m => m.rating >= parseFloat(minRating));
  if (minYear) filteredMovies = filteredMovies.filter(m => m.releaseYear >= parseInt(minYear));
  if (maxYear) filteredMovies = filteredMovies.filter(m => m.releaseYear <= parseInt(maxYear));

  if (filteredMovies.length === 0)
    return res.status(404).json({ message: "No se encontraron películas con esos criterios." });

  res.json(filteredMovies);
};

// Obtener película por ID
const getMovieById = (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (!movie) return res.status(404).json({ message: "Película no encontrada." });
  res.json(movie);
};

// Crear nueva película
const createMovie = (req, res) => {
  const { id, title, releaseYear, genre, duration, directorId, rating, language, country } = req.body;

  // Validar campos obligatorios
  if (!id || !title || !releaseYear || !genre || !duration || !directorId || !rating) {
    return res.status(400).json({ message: "Faltan campos obligatorios." });
  }

  // Validar que el director exista
  const directorExists = directors.find(d => d.id === directorId);
  if (!directorExists) {
    return res.status(422).json({ message: "El directorId no existe." });
  }

  // Validar que la película no exista
  const movieExists = movies.find(m => m.id === id);
  if (movieExists) {
    return res.status(409).json({ message: "La película ya existe." });
  }

  const newMovie = { id, title, releaseYear, genre, duration, directorId, rating, language, country };
  movies.push(newMovie);

  res.status(201).json(newMovie);
};

// Actualizar película existente
const updateMovie = (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (!movie) return res.status(404).json({ message: "Película no encontrada." });

  const { title, releaseYear, genre, duration, directorId, rating, language, country } = req.body;

  // Validar que el director exista si se proporciona directorId
  if (directorId) {
    const directorExists = require('../datos/directors').find(d => d.id === directorId);
    if (!directorExists) {
      return res.status(422).json({ message: "El directorId no existe." });
    }
  }

  // Actualizar campos solo si vienen en el body
  if (title) movie.title = title;
  if (releaseYear) movie.releaseYear = releaseYear;
  if (genre) movie.genre = genre;
  if (duration) movie.duration = duration;
  if (directorId) movie.directorId = directorId;
  if (rating) movie.rating = rating;
  if (language) movie.language = language;
  if (country) movie.country = country;

  res.json(movie);
};

// Eliminar película existente
const deleteMovie = (req, res) => {
  const movieIndex = movies.findIndex(m => m.id === req.params.id);
  if (movieIndex === -1) return res.status(404).json({ message: "Película no encontrada." });

  // Eliminar la película del array
  const deletedMovie = movies.splice(movieIndex, 1);

  // Opcional: eliminar también las relaciones con actores si usas movieActors
  const movieActors = require('../datos/movieActors');
  for (let i = movieActors.length - 1; i >= 0; i--) {
    if (movieActors[i].movieId === req.params.id) {
      movieActors.splice(i, 1);
    }
  }

  res.json({ message: "Película eliminada.", deletedMovie: deletedMovie[0] });
};


module.exports = { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
