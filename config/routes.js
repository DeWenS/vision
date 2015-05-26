/**
 * Module dependencies
 */

var auth = require('./middlewares/auth');

/**
 * Exports
 */

module.exports = function(app, passport){
    var routes = require('./routes/index');
    var users = require('./routes/users');
    var login = require('./routes/login');

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
};