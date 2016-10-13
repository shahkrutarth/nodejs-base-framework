module.exports = {
	handler: function(statusCode, customMessage) {
		returnData = {
			"responseHeaders": {
				"status": statusCode
			},
			"status": "success",
			"responseParams": {}
		};


		if (statusCode === 200) {
			returnData.responseParams = {
				"status": "success",
				"statusMessage": "The request was fulfilled."
			};
		};
		if (statusCode === 201) {
			returnData.responseParams = {
				"status": "success",
				"statusMessage": "Record Created."
			};
		};
		if (statusCode === 202) {
			returnData.responseParams = {
				"status": "success",
				"statusMessage": "The request has been accepted for processing. But not completed."
			};
		};
		if (statusCode === 203) {
			returnData.responseParams = {
				"status": "success",
				"statusMessage": "Partial Information."
			};
		};
		if (statusCode === 204) {
			returnData.responseParams = {
				"status": "success",
				"statusMessage": "Server has received the request but there is no information to send back."
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