var express = require('express');
//var routes = require('./routes');
var players = require('./routes/players');
var http = require('http');
var path = require('path');

//var monk = require('monk');
//var config = require('./config');
//var db = monk(config.mongodb);


/**
 * @type {*}
 * @memberOf express
 */
var app = express();

// all environments
//app.set('port', process.env.PORT || 2998);
//app.set('views', path.join(__dirname, 'views')); //TODO JAJ maybe we can re-enable this? not sure how JADE plays with backbone views
//app.set('view engine', 'jade');                  //TODO JAJ Once we get backbone fully working, work at playing with these app.use's
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));

app.configure(function () {
    app.set('port', process.env.PORT || 2998);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/players', players.findAll);
//app.put('/players/:nickname/score', players.update(db));
//app.get('/players', players.findAll());

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
