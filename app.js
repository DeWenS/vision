var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport');

// models
var User = require('./models/user');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB
mongoose.connect('127.0.0.1/node-vision');

// Passport
var FacebookStrategy = require('passport-facebook').Strategy;

exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Passport config
passport.use(
    new FacebookStrategy(
        {
            clientID: '1583033578636896',
            clientSecret: 'b63c4ddfacf97bafc09db0d3897cf4ea',
            callbackURL: 'http://localhost:3001/auth/facebook/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            //console.log(accessToken);
            //console.log(profile);
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
                    //newUser.fb.email = profile.emails[0].value;

                    newUser.save(function(err){
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        }
    )
);

// routes ============================================================================================

app.use('/', routes);
app.use('/', login);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
