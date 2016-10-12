var config = {
	local: {
		mode: 'local',
		port: 4110
	},
	staging: {
		mode: 'staging',
		port: 3110
	},
	production: {
		mode: 'production',
		port: 5110
	}
};

logfile = ROOT_DIR + './access.log';

module.exports = function(mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
};