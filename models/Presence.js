const mongoose = require('mongoose');

const PresenceSchema = new mongoose.Schema({
	studentId: {
		type: String,
		required: true
	},
	sessionId: {
		type: String,
		required: true
	},
	present: {
		type: Boolean,
		required: true
	}
});

module.exports = mongoose.model('Presence', PresenceSchema);
