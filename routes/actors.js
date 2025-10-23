const express = require('express');
const router = express.Router();
const { getAllActors, getActorMovies, createActor } = require('../controllers/actorsControllers');

// Ruta GET /api/actors
router.get('/', getAllActors);
router.get('/:id/movies', getActorMovies);
router.post('/', createActor);

module.exports = router;
