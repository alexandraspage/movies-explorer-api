const router = require('express').Router();

const { validateUserMe, validateSignUp, validateSignIn } = require('../middlewares/validation');

const {
  getUser, changeUserInfo, createUser, login,
} = require('../controllers/user');

router.get('/users/me', getUser);

router.patch('/users/me', validateUserMe, changeUserInfo);

router.post('/signup', validateSignUp, createUser);

router.post('/signin', validateSignIn, login);

module.exports = router;
