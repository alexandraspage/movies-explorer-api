const router = require('express').Router();

const { validateUserMe } = require('../middlewares/validation');

const {
  getUser, changeUserInfo,
} = require('../controllers/user');

router.get('/users/me', getUser);

router.patch('/users/me', validateUserMe, changeUserInfo);

module.exports = router;
