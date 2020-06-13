const mongoose = require('mongoose');

const PresenceSchema = new mongoose.Schema({
	studentId: {
		type: ObjectId,
		required: true
	},
	sessionId: {
		type: ObjectId,
		required: true
	},
	present: {
		type: Boolean,
		required: true
	}
});

module.exports = mongoose.model('Presence', PresenceSchema);
