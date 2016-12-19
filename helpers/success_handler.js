module.exports = {
	handler: function(statusCode, customMessage) {
		returnData = {
			"statusCode": statusCode,
			"status": "success",
			"statusMessage": ""
		};

		if (statusCode === 200) {
			returnData.status = "success";
			returnData.statusMessage = "The request was fulfilled.";
		}
		if (statusCode === 201) {
			returnData.status = "success";
			returnData.statusMessage = "Record Created.";
		}
		if (statusCode === 202) {
			returnData.status = "success";
			returnData.statusMessage = "The request has been accepted for processing. But not completed.";
		}
		if (statusCode === 203) {
			returnData.status = "success";
			returnData.statusMessage = "Partial Information.";
		}
		if (statusCode === 204) {
			returnData.status = "success";
			returnData.statusMessage = "Server has received the request but there is no information to send back.";
		}
		if (customMessage !== undefined) {
			returnData.statusMessage += ', ' + customMessage;
		}
		return returnData;
	},
	dataHandler: function(statusCode, customMessage,resultData) {
		returnData = {
			"statusCode": statusCode,
			"status": "success",
			"statusMessage": "",
			"result": resultData
		};

		if (statusCode === 200) {
			returnData.status = "success";
			returnData.statusMessage = "The request was fulfilled.";
		}
		if (statusCode === 201) {
			returnData.status = "success";
			returnData.statusMessage = "Record Created.";
		}
		if (statusCode === 202) {
			returnData.status = "success";
			returnData.statusMessage = "The request has been accepted for processing. But not completed.";
		}
		if (statusCode === 203) {
			returnData.status = "success";
			returnData.statusMessage = "Partial Information.";
		}
		if (statusCode === 204) {
			returnData.status = "success";
			returnData.statusMessage = "Server has received the request but there is no information to send back.";
		}
		if (customMessage !== undefined) {
			returnData.statusMessage += ', ' + customMessage;
		}
		return returnData;
	}
};