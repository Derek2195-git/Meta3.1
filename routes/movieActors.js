const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams permite acceder a movieId
const { addActorToMovie, getMovieActors } = require('../controllers/movieActorsControllers');

// POST /api/movies/:movieId/actors
router.post('/:movieId/actors', addActorToMovie);
router.get('/:movieId/actors', getMovieActors);

module.exports = router;
