var express = require('express'),
	fs = require('fs-extra'),
	path = require('path'),
	routes = require('json-routing'),
	apiv = require('api-version'),
	apiDomain = express(),
	frontDomain = express(),
	adminDomain = express();


module.exports = function() {
	/*loading all Views dinamically for each modules mentioned in modules.json file*/
	var frontViews = [];
	var adminViews = [];
	for (var i = 0; i < modules.length; i++) {
		/*@Front-End views*/
		frontViews.push(ROOT_DIR + 'app/' + modules[i] + '/views/front');
		/*@Back-End views*/
		adminViews.push(ROOT_DIR + 'app/' + modules[i] + '/views/admin');
	};
	
	adminDomain.set('views', adminViews);
	frontDomain.set('views', frontViews);
	
	/*Dynamically set routes for each domains*/
	for (var i = 0; i < modules.length; i++) {
		/*@Front-End Routes*/
		var routeOptions = {
		  routesPath: './app/' + modules[i] + "/routes/front"
		    , controllersPath: './app/' + modules[i] + "/controllers/front"
		    , policyPath: './app/' + modules[i] + '/policy'
		    , cors: false
		};
		routes(frontDomain, routeOptions);
		/*@Back-End Routes*/
		var routeOptions = {
		  routesPath: './app/' + modules[i] + "/routes/admin"
		    , controllersPath: './app/' + modules[i] + "/controllers/admin"
		    , policyPath: './app/' + modules[i] + '/policy'
		    , cors: false
		};
		routes(adminDomain, routeOptions);
		/*@Api Routes*/
		var routeOptions = {
		  routesPath: './app/' + modules[i] + "/routes/api"
		    , controllersPath: './app/' + modules[i] + "/controllers/api"
		    , policyPath: './app/' + modules[i] + '/policy'
		    , cors: false
		};
		routes(apiDomain, routeOptions);
	}
	/*Get environment config file*/
	envConfigFile = require(ROOT_DIR + 'config/' + process.argv[2] + '.json');
	/*Register all domains and assign object to each created above*/
	var domains = {
		'domains' : [
			{ 'domain_name' : envConfigFile.siteurl, 'object': frontDomain },
			{ 'domain_name' : envConfigFile.adminurl, 'object': adminDomain },
			{ 'domain_name' : envConfigFile.apiurl, 'object': apiDomain }
		]
	};
	return domains;
}