const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
	intitule: {
		type: String,
		required: true
	},
	teacher: {
		type: String,
		required: true
	},
	sessions: {
		type: Array,
		default: []
	},
	branches: {
		type: Array,
		default: []
	}
});

module.exports = mongoose.model('Lesson', LessonSchema);
