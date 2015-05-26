/**
 * Module dependencies
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var facebook = require('./passport/facebook');

/**
 * Exports
 */

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(facebook);
};