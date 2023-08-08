const router = require('express').Router();

const { validateMovie, validateDeliteMovie } = require('../middlewares/validation');
const { getMovies, postMovie, deleteMovie } = require('../controllers/movie');

router.get('/movies', getMovies);

router.post('/movies', validateMovie, postMovie);

router.delete('/movies/:_id', validateDeliteMovie, deleteMovie);

module.exports = router;
