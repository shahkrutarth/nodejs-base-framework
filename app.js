/**********global variables**************/
if (process.argv[2] === undefined) {
  process.argv[2] = 'local';
}
global.ROOT_DIR = __dirname + '/';
global.SET_EXPIRY = 6;
global.PAGINATION_LIMIT = 20;
global.IMAGE_FOLDER = 'public/media/';
global.S3_ENABLED = false;
global.ENVIRONMENT = 'local';
global.CDN_ENABLED = false;
global.CDN_URL = '';
global.MongoClient = require('mongodb').MongoClient;
global.ObjectID = require('mongodb').ObjectID;

global.MYSQLOBJ = require(ROOT_DIR + 'config/connection').connectToMysqlMaster(); // db connection
require(ROOT_DIR + 'config/connection').connectToMongo(function(data) {
  global.MONGOOBJ = data
});
global.EVENTS = require('events');
EVENTS.EventEmitter.prototype._maxListeners = 100;
global.EVENTEMITTER = new EVENTS.EventEmitter();
global.MODULES = require(ROOT_DIR + 'config/modules.json');
/****************************************/

var redis = require('redis');
global.client = redis.createClient(null, null, { detect_buffers: true });


var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var express = require('express'),
    path    = require('path'),
    favicon = require('serve-favicon'),
    winston = require('winston'),
    bodyParser = require('body-parser'),
    http    = require('http'),
    jroutes = require('json-routing'),
    underscore = require('underscore'),
    vhost   = require('vhost'),
    multer  = require('multer'),
    fs      = require('fs');

var config = require('./config/env')(),
    domain = require('./config/domain-config')();

// Load all Helpers
ERROR   = require(ROOT_DIR + 'helpers/error_handler.js');
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

// configure domains
for(var key in domain.domains)
{
  app.use(vhost(domain.domains[key].domain_name, domain.domains[key].object));
  app.use(domain.domains[key].object);
  domain.domains[key].object.set('view engine', 'jade');
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, secretKey,accessToken");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
    res.header("Access-Control-Expose-Headers", "accessToken");
    next();
});

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

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    cluster.fork();
  });
} else {

    http.createServer(app).listen(config.port, function(){
        ENVIRONMENT = config.mode;
        console.log('Express server listening on port ' + config.port + ' environment : ' + config.mode);
    });
    console.log('Worker ' + cluster.worker.id + ' running!');
}

module.exports = app;