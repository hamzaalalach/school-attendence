const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
	salle: {
		type: String,
		required: true
	},
	heure: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	lesson: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Session', SessionSchema);
