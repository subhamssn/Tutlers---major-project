const express = require('express');

const passport = require('../config/passport-local-strategy');

const usersController = require('../controllers/users_controller');

const router = express.Router();



router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/sign-up', usersController.sign_up);
router.get('/sign-in', usersController.sign_in);
router.post('/create', usersController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);



module.exports = router;