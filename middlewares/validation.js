const { celebrate, Joi } = require('celebrate');

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/).required(),
    trailerLink: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/).required(),
    thumbnail: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/).required(),
    movieId: Joi.number().required(),
    nameRu: Joi.string().required(),
    nameEn: Joi.string().required(),
  }),
});

const validateDeliteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

const validateUserMe = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    email: Joi.string().email().optional(),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  validateMovie,
  validateDeliteMovie,
  validateUserMe,
  validateSignUp,
  validateSignIn,
};
