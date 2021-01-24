const Teacher = require('../models/Teacher');

exports.getTeachers = cb => {
	Teacher.find({}, (err, teachers) => {
		err ? cb(err) : cb(null, teachers);
	});
};

exports.createTeacher = (data, cb) => {
	if (!data.nom || !data.prenom) {
		cb({ status: 422 });
	} else {
		new Teacher(data).save((err, teacher) => {
			err ? cb({ status: 500, message: err }) : cb(null, teacher);
		});
	}
};

exports.updateTeacher = (id, data, cb) => {
	Teacher.findById(id, (err, teacher) => {
		if (err || !teacher) {
			cb({ message: err, status: 404 });
		} else {
			for (let i in data) {
				teacher[i] = data[i];
			}
			teacher.save((err, newTeacher) => {
				err ? cb({ message: err, status: 500 }) : cb(null, newTeacher);
			});
		}
	});
};

exports.deleteTeacher = (id, cb) => {
	Teacher.findOneAndRemove({ _id: id }, (err, teacher) => {
		if (err || !teacher) {
			cb({ status: 404 });
		} else {
			cb(null, teacher);
		}
	});
};
