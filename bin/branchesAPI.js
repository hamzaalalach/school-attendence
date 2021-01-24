const Branch = require('../models/Branch');
const Lesson = require('../models/Lesson');

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
		if (err || !branch) {
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
		if (err || !branch) {
			cb({ status: 404 });
		} else {
			cb(null, branch);
		}
	});
};

exports.addLesson = (id, data, cb) => {
	Branch.findByIdAndUpdate(
		id,
		{
			$push: {
				lessons: new String(data.id)
			}
		},
		{ new: true },
		(err, newBranch) => {
			if (err) {
				cb({ status: 404 });
			} else {
				Lesson.findByIdAndUpdate(
					data.id,
					{
						$push: {
							branches: new String(id)
						}
					},
					err => {
						err ? cb({ status: 500, message: err }) : cb(null, newBranch);
					}
				);
			}
		}
	);
};

exports.removeLesson = (branchId, lessonId, cb) => {
	Branch.findByIdAndUpdate(
		branchId,
		{
			$pull: {
				lessons: new String(lessonId)
			}
		},
		{ new: true },
		(err, newBranch) => {
			if (err) {
				cb({ status: 404 });
			} else {
				Lesson.findByIdAndUpdate(
					lessonId,
					{
						$pull: {
							branches: new String(branchId)
						}
					},
					err => {
						err ? cb({ status: 500, message: err }) : cb(null, newBranch);
					}
				);
			}
		}
	);
};
