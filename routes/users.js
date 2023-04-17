const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');


router.get('/sign-up', usersController.sign_up);
router.get('/sign-in', usersController.sign_in);

module.exports = router;