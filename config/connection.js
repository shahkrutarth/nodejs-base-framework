if(process.argv[2])
	var jsonDB = require('./' + process.argv[2] + '.json');
else
	var jsonDB = require('./local.json');

module.exports.connectToMysqlMaster = function(){
	var knex = require('knex')({
		client: 'mysql',
		connection: jsonDB.mysql.master,
		pool: {
			min: 0,
			max: 7
		}
	});

	var bookshelf = require('bookshelf')(knex);
	return bookshelf;
};

module.exports.connectToMysqlSlave = function(){
	var knex = require('knex')({
		client: 'mysql',
		connection: jsonDB.mysql.slave,
		pool: {
			min: 0,
			max: 7
		}
	});

	var bookshelf = require('bookshelf')(knex);
	return bookshelf;
};

module.exports.connectToMongo = function(cb){
	MongoClient.connect(jsonDB.mongo, function(err, db) {
		if (err) {
			throw err;
		}
		cb(db);
	});
};