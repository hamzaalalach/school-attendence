const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
	intitule: {
		type: String,
		required: true
	},
	teacher: {
		type: ObjectId,
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
