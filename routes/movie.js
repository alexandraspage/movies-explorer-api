const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getMovies, postMovie, deleteMovie } = require('../controllers/movie');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/).required(),
    trailerLink: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/).required(),
    thumbnail: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/).required(),
    owner: Joi.string().length(24).hex().required(),
    movieId: Joi.number().required(),
    nameRu: Joi.string().required(),
    nameEn: Joi.string().required(),
  }),
}), postMovie);

router.delete('/movies/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
