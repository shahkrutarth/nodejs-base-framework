module.exports = {
	handler: function(errorCode, customMessage) {
		returnData = {
			"responseHeaders": {
				"statusCode": errorCode
			},
			"status": "error",
			"responseParams": {}
		};
		if (errorCode === 430) {
			returnData.responseParams = {
				"status": "error",
				"statusMessage": "Access token expired."
			};
		};
		if (errorCode === 435) {
			returnData.responseParams = {
				"status": "error",
				"statusMessage": "Invalid access token."
			};
		};
		if (errorCode === 440) {
			returnData.responseParams = {
				"status": "error",
				"statusMessage": "Invalid Secret Key."
			};
		};
		if (errorCode === 400) {
			returnData.responseParams = {
				"status": "error",
				"statusMessage": "Bad Request."
			};
		};
		if (errorCode === 401) {
			returnData.responseParams = {
				"status": "error",
				"statusMessage": "Not Authorized."
			};
		};
		if (errorCode === 403) {
			returnData.responseParams = {
				"status": "error",
				"statusMessage": "Forbidden."
			};
		};
		if (errorCode === 404) {
			returnData.responseParams = {
				"status": "error",
				"statusMessage": "Resource Not Found."
			};
		};
		if (errorCode === 405) {
			returnData.responseParams = {
				"status": "error",
				"statusMessage": "Method Not Allowed."
			};
		};
		if (errorCode === 415) {
			returnData.responseParams = {
				"status": "error",
				"statusMessage": "Unsupported Media Type."
			};
		};
		if (errorCode === 410) {
			returnData.responseParams = {
				"status": "error",
				"statusMessage": "Data validation failed."
			};
		};
		if (errorCode === 500) {
			returnData.responseParams = {
				"status": "error",
				"statusMessage": "Internal Server Error."
			};
		};
		if (customMessage !== undefined) {
			returnData.responseParams.message = customMessage;
		} else {
			returnData.responseParams.message = {};
		}
		return returnData;
	}
};