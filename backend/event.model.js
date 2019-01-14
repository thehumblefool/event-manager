const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({
	eventName: {
		type: String
	},

	eventDate: {
		type: String
	},

	eventTime: {
		type: String
	},

	eventDescription: {
		type: String
	},

	eventFollowerCount: {
		type: String
	}
});

module.exports = mongoose.model('Event', Event);