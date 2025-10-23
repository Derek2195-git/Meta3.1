const express = require('express');
const router = express.Router();
const { getAllDirectors, getDirectorMovies, createDirector } = require('../controllers/directorsControllers');

// Ruta GET /api/directors
router.get('/', getAllDirectors);
router.get('/:id/movies', getDirectorMovies);
router.post('/', createDirector);

module.exports = router;
