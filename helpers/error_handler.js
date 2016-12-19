module.exports = {
	handler: function(errorCode, customMessage) {
		returnData = {
			"statusCode": errorCode,
			"status": "error",
			"statusMessage": ""
		};
		if (errorCode === 430) {
			returnData.status = "error";
			returnData.statusMessage = "Access token expired.";
		};
		if (errorCode === 435) {
				returnData.status = "error";
				returnData.statusMessage = "Invalid access token.";
		};
		if (errorCode === 440) {
				returnData.status = "error";
				returnData.statusMessage = "Invalid Secret Key.";
		};
		if (errorCode === 400) {
				returnData.status = "error";
				returnData.statusMessage = "Bad Request.";
		};
		if (errorCode === 401) {
				returnData.status = "error";
				returnData.statusMessage = "Not Authorized.";
		};
		if (errorCode === 403) {
				returnData.status = "error";
				returnData.statusMessage = "Forbidden.";
		};
		if (errorCode === 404) {
				returnData.status = "error";
				returnData.statusMessage = "Resource Not Found.";
		};
		if (errorCode === 405) {
				returnData.status = "error";
				returnData.statusMessage = "Method Not Allowed.";
		};
		if (errorCode === 415) {
				returnData.status = "error";
				returnData.statusMessage = "Unsupported Media Type.";
		};
		if (errorCode === 410) {
				returnData.status = "error";
				returnData.statusMessage = "Data validation failed.";
		};
		if (errorCode === 500) {
				returnData.status = "error";
				returnData.statusMessage = "Internal Server Error.";
		};
		if (customMessage !== undefined) {
			returnData.statusMessage += ', ' + customMessage;
		}

		return {
			"statusCode": returnData.responseHeaders.statusCode,
			"status": returnData.responseParams.status,
			"message": returnData.responseParams.message
		};
	},
	dataHandler: function(errorCode, customMessage, resultData) {
		returnData = {
			"statusCode": errorCode,
			"status": "error",
			"statusMessage": "",
			"result": resultData
		};
		if (errorCode === 430) {
			returnData.status = "error";
			returnData.statusMessage = "Access token expired.";
		};
		if (errorCode === 435) {
				returnData.status = "error";
				returnData.statusMessage = "Invalid access token.";
		};
		if (errorCode === 440) {
				returnData.status = "error";
				returnData.statusMessage = "Invalid Secret Key.";
		};
		if (errorCode === 400) {
				returnData.status = "error";
				returnData.statusMessage = "Bad Request.";
		};
		if (errorCode === 401) {
				returnData.status = "error";
				returnData.statusMessage = "Not Authorized.";
		};
		if (errorCode === 403) {
				returnData.status = "error";
				returnData.statusMessage = "Forbidden.";
		};
		if (errorCode === 404) {
				returnData.status = "error";
				returnData.statusMessage = "Resource Not Found.";
		};
		if (errorCode === 405) {
				returnData.status = "error";
				returnData.statusMessage = "Method Not Allowed.";
		};
		if (errorCode === 415) {
				returnData.status = "error";
				returnData.statusMessage = "Unsupported Media Type.";
		};
		if (errorCode === 410) {
				returnData.status = "error";
				returnData.statusMessage = "Data validation failed.";
		};
		if (errorCode === 500) {
				returnData.status = "error";
				returnData.statusMessage = "Internal Server Error.";
		};
		if (customMessage !== undefined) {
			returnData.statusMessage += ', ' + customMessage;
		}

		return {
			"statusCode": returnData.responseHeaders.statusCode,
			"status": returnData.responseParams.status,
			"message": returnData.responseParams.message
		};
	}
};