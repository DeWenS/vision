var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {successRedirect: '/users', failureRedirect: '/login'})
);

module.exports = router;