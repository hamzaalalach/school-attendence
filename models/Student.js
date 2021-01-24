const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
	matricule: {
		type: String,
		required: true
	},
	nom: {
		type: String,
		required: true
	},
	prenom: {
		type: String,
		required: true
	},
	branch: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Student', StudentSchema);
