const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
	label: {
		type: String,
		required: true
	},
	lessons: {
		type: Array,
		default: []
	},
	students: {
		type: Array,
		default: []
	}
});

module.exports = mongoose.model('Branch', BranchSchema);
