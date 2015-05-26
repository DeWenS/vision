/**
 * Module dependencies.
 */

var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

/**
 * Expose
 */

module.exports = new FacebookStrategy(
    {
        clientID: '1583033578636896',
        clientSecret: 'b63c4ddfacf97bafc09db0d3897cf4ea',
        callbackURL: 'http://localhost:3001/auth/facebook/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        // async
        process.nextTick(function () {
            User.findOne({'fb.id': profile.id}, function(err, user) {
                if (err) return done(err);
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();
                    newUser.username    = profile.displayName; // set the users facebook id
                    newUser.fb.id    = profile.id; // set the users facebook id
                    newUser.fb.access_token = accessToken; // we will save the token that facebook provides to the user
                    newUser.fb.first_name  = profile.name.givenName;
                    newUser.fb.last_name = profile.name.familyName; // look at the passport user profile to see how names are returned

                    newUser.save(function(err){
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }
);