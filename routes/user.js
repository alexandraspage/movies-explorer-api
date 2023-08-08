const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, changeUserInfo, createUser, login,
} = require('../controllers/user');

router.get('/users/me', getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    email: Joi.string().email(),
  }),
}), changeUserInfo);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = router;
