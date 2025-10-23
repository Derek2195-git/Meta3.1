const express = require('express');
const router = express.Router();
const { getAllMovies, getMovieById } = require('../controllers/moviesControllers');

// Rutas para películas
router.get('/', getAllMovies);
router.get('/:id', getMovieById);

module.exports = router;
