/**
 * Module dependencies
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

/**
 * Expose
 */

module.exports = function(app, passport){
    // view engine setup
    app.set('views', path.join(__dirname, '../app/views'));
    app.set('view engine', 'jade');

    // static files middleware
    app.use(express.static(path.join(__dirname, '../public')));

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));

    // logging
    app.use(logger('dev'));

    // body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use(cookieParser());

    // session
    app.use(session({
        secret: '6785rv6d6r7h5rtb6wrt342yjft973427t5',
        resave: false,
        saveUninitialized: true
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());
};