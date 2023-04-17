const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/sign-up', usersController.sign_up);

module.exports = router;