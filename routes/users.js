const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/sign_up',usersController.signUp);
router.get('/sign_in',usersController.signIn);
router.post('/create',usersController.create);

//use passport as a middleware to authenticate
router.post('/create_session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign_in'},
),usersController.createSession);

router.get('/sign-out',usersController.destroySession);

router.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google',
    {failureRedirect:'/users/sign-in'}),usersController.createSession);

module.exports = router;