/**
 * Module dependencies
 */
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var fs = require('fs');

var app = express();

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
    if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// MongoDB
require('./config/mongo')(mongoose);

// Passport
require('./config/passport')(passport);

// Express
require('./config/express')(app,passport);

// Routes
require('./config/routes')(app,passport);

/**
 * Exports
 */

module.exports = app;