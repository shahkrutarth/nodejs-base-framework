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
	for (var i = 0; i < MODULES.length; i++) {
		/*@Front-End views*/
		if (fs.existsSync(ROOT_DIR + 'app/' + MODULES[i] + '/views/front')) {
			frontViews.push(ROOT_DIR + 'app/' + MODULES[i] + '/views/front');
		}
		/*@Back-End views*/
		if (fs.existsSync(ROOT_DIR + 'app/' + MODULES[i] + '/views/admin')) {
			adminViews.push(ROOT_DIR + 'app/' + MODULES[i] + '/views/admin');
		}
	};
	
	adminDomain.set('views', adminViews);
	frontDomain.set('views', frontViews);
	
	/*Dynamically set routes for each domains*/
	for (var i = 0; i < MODULES.length; i++) {
		/*@Front-End Routes*/
		var routeFile = '';
		routeFile = './app/' + MODULES[i] + "/routes/front";
		if (fs.existsSync(routeFile)) {
			var routeOptions = {
			  routesPath: './app/' + MODULES[i] + "/routes/front"
			    , controllersPath: './app/' + MODULES[i] + "/controllers/front"
			    , policyPath: './app/' + MODULES[i] + '/policy'
			    , cors: false
			};
			routes(frontDomain, routeOptions);
		}

		
		/*@Back-End Routes*/
		var routeFile = '';
		routeFile = './app/' + MODULES[i] + "/routes/admin";
		if (fs.existsSync(routeFile)) {
			var routeOptions = {
			  routesPath: './app/' + MODULES[i] + "/routes/admin"
			    , controllersPath: './app/' + MODULES[i] + "/controllers/admin"
			    , policyPath: './app/' + MODULES[i] + '/policy'
			    , cors: false
			};
			routes(adminDomain, routeOptions);
		}
		/*@Api Routes*/
		var routeFile = '';
		routeFile = './app/' + MODULES[i] + "/routes/api";
		if (fs.existsSync(routeFile)) {
			var routeOptions = {
			  routesPath: './app/' + MODULES[i] + "/routes/api"
			    , controllersPath: './app/' + MODULES[i] + "/controllers/api"
			    , policyPath: './app/' + MODULES[i] + '/policy'
			    , cors: false
			};
			routes(apiDomain, routeOptions);
		}
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