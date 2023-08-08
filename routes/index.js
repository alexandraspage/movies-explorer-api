const router = require('express').Router();

const { NotFoundError } = require('../middlewares/error');
const auth = require('../middlewares/auth');

const { createUser, login } = require('../controllers/user');

const userRoutes = require('./user');
const moviesRoutes = require('./movie');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);

router.use(userRoutes);
router.use(moviesRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
