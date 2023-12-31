const rateLimit = require('express-rate-limit');

const LIMITER = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

const { PORT = 4000, DB_URL = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;

const NO_ERROR = 200;
const CREATED = 201;

module.exports = {
  PORT, DB_URL, LIMITER, NO_ERROR, CREATED,
};
