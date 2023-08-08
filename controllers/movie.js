const Movie = require('../models/movie');

const { NotFoundError, ForbiddenError } = require('../middlewares/error');

const { NO_ERROR, CREATED } = require('../utils/config');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
    //  console.log(movies);
      res.status(NO_ERROR).send(movies);
    })
    .catch(next);
};

const postMovie = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movies) => res.status(CREATED).send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => new NotFoundError('Not found'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new ForbiddenError('Нет прав на удаление'));
      } else {
        Movie.deleteOne(movie)
          .then((data) => res.status(NO_ERROR).send(data));
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
