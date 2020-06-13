const Branch = require('../models/Branch');

exports.getBranches = cb => {
	Branch.find({}, (err, branches) => {
		err ? cb(err) : cb(null, branches);
	});
};

exports.createBranch = (data, cb) => {
	if (!data.label) {
		cb({ status: 422 });
	} else {
		new Branch(data).save((err, branch) => {
			err ? cb({ status: 500, message: err }) : cb(null, branch);
		});
	}
};

exports.updateBranch = (id, data, cb) => {
	Branch.findById(id, (err, branch) => {
		if (err) {
			cb({ status: 404 });
		} else {
			for (let i in data) {
				branch[i] = data[i];
			}
			branch.save((err, newBranch) => {
				err ? cb({ status: 500, message: err }) : cb(null, newBranch);
			});
		}
	});
};

exports.deleteBranch = (id, cb) => {
	Branch.findOneAndRemove({ _id: id }, (err, branch) => {
		err ? cb(err) : cb(null, branch);
	});
};
