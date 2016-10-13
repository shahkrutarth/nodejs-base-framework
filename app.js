// start file
ROOT_DIR = __dirname + '/';

if(process.argv[2] === undefined) {
  process.argv[2] = 'local';
}
var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  // logger = require('morgan'),
  bodyParser = require('body-parser'),
  http = require('http'),
  jroutes = require('json-routing'),
  underscore = require('underscore'),
  vhost = require('vhost'),
  winston = require('winston'),
  connectionDB = require('./config/connection');
  modules = require(ROOT_DIR + 'config/modules.json');
  
  var config = require('./config/env')(),
    domain = require('./config/domain-config')();

// Load all Helpers
ERROR = require(ROOT_DIR + 'helpers/error_handler.js');
SUCCESS = require(ROOT_DIR + 'helpers/success_handler.js');

//@TODO::write logic for module discovery.
//@TODO::write logic for module including module routes.
//@TODO::write logic for module including module config.

//@TODO::write logic for module wise view inclusion.

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static path
app.use(express.static(path.join(__dirname, 'public')));
// DB connections
mysqlObj = connectionDB.connectToMysqlSlave();

// configure domains
for(var key in domain.domains)
{
  app.use(vhost(domain.domains[key].domain_name, domain.domains[key].object));
  app.use(domain.domains[key].object);
  domain.domains[key].object.set('view engine', 'jade');
}
// mongoObj = require(ROOT_DIR + 'config/connection').connectToMongoDB();

//configure logger
var logger = new (winston.Logger)({
  transports: [
  	new winston.transports.File({ filename: ROOT_DIR + 'logs/debug.log', json: false })
  ],
  exceptionHandlers: [
  	new winston.transports.File({ filename: ROOT_DIR + 'logs/exceptions.log', json: false })
  ],
  exitOnError: false
});

module.exports = logger;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

// error handlers

// development error handler
// will print stacktrace
if (config.mode == 'local' || config.mode == 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

http.createServer(app).listen(config.port, function(){
  console.log('Express server listening on port ' + config.port + ' environment : ' + config.mode);
});

module.exports = app;