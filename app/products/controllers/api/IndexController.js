module.exports = {
	getProducts: function (req, res) {
		// Connect to you database and fetch all records from products table and return it as json
		// Use ERROR (Helper to handle errors)
		// E.g. 
		// ERROR.handler(430) Without Custom message
		// OR 
		// ERROR.handler(430, "Your Token has been expired; Please provide refresh token to generate new token") With Custom message
		// Use SUCCESS (Helper to handle success status)
		// E.g.
		// SUCCESS.handler(200) Without Custom message
		// OR
		// SUCCESS.handler(200, "Your request was fulfilled, Thank you") With Custom message
		res.json(SUCCESS.handler(200, "Your request was fulfilled, Thank you"));
	},

	saveProducts: function (req, res) {
		res.json(ERROR.handler(410, "Your do not have permission to perform this action!"));
	},

	updateProducts: function (req, res) {
	},

	removeProducts: function (req, res) {
	},

	getProduct: function (req, res) {
	},

	saveProduct: function (req, res) {
	},

	updateProduct: function (req, res) {
	},

	removeProduct: function (req, res) {
	}
};