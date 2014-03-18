var express = require('express');

var routes = require('./routes');
var players = require('./routes/players');

var http = require('http');
var path = require('path');

var monk = require('monk');
var db = monk('joshuawyse.com:27017/trivia-scoreboard');


/**
 * @type {*}
 * @memberOf express
 */
var app = express();

// all environments
app.set('port', process.env.PORT || 2998);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index(db));
app.put('/players/:nickname', players.incrementByOne(db));
app.put('/players/:nickname/set/:newScore', players.set(db));
app.put('/players/:nickname/-', players.decrementByOne(db));

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
