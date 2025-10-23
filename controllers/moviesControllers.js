const movies = require('../datos/movies');

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

module.exports = { getAllMovies, getMovieById };
