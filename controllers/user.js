const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { NO_ERROR, CREATED } = require('../utils/config');

const User = require('../models/user');

const { UnauthorizedError, NotFoundError } = require('../middlewares/error');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Not found'))
    .then((user) => res.status(NO_ERROR).send(user))
    .catch(next);
};

const changeUserInfo = (req, res, next) => {
  const userId = req.user;
  const change = req.body;

  User.findByIdAndUpdate(userId, change, { new: true, runValidators: true })
    .orFail(new NotFoundError('Not found'))
    .then((user) => res.status(NO_ERROR).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(String(req.body.password), 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(CREATED).send({ data: user }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => next(new UnauthorizedError('Неправильный логин или пароль')))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const token = jsonWebToken.sign(
              {
                _id: user._id,
              },
              NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
              { expiresIn: '7d' },
            );
            res.send({ jwt: token, data: user });
          } else {
            next(new UnauthorizedError('Неправильный логин или пароль'));
          }
        });
    })
    .catch(next);
};

module.exports = {
  getUser,
  changeUserInfo,
  createUser,
  login,
};
