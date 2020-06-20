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
	email: {
		type: String,
		required: false
	},
	adresse: {
		type: String,
		required: false
	},
	telephone: {
		type: String,
		required: false
	},
	courses: {
		type: Array,
		default: []
	}
});

module.exports = mongoose.model('Teacher', TeacherSchema);
