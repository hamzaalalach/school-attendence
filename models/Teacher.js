const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
	nom: {
		type: String,
		required: true
	},
	prenom: {
		type: String,
		required: true
	},
	courses: {
		type: Array,
		default: []
	}
});

module.exports = mongoose.model('Teacher', TeacherSchema);
