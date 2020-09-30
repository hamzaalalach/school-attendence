const Student = require('../models/Student');
const Branch = require('../models/Branch');

exports.getStudents = cb => {
	Student.find({}, (err, students) => {
		err ? cb(err) : cb(null, students);
	});
};

exports.createStudent = (data, cb) => {
	Student.find({ matricule: data.matricule }, (err, exists) => {
		if (err) {
			cb({ status: 500 });
		} else if (exists.length != 0) {
			cb({ status: 409 });
		} else if (!data.matricule || !data.nom || !data.prenom || !data.branch) {
			cb({ status: 422 });
		} else {
			new Student(data).save((err, student) => {
				if (err) {
					cb({ status: 500 });
				} else {
					Branch.updateOne(
						{ _id: student.branch },
						{
							$push: {
								students: new String(student._id)
							}
						},
						err => {
							err ? cb({ status: 500, message: err }) : cb(null, student);
						}
					);
				}
			});
		}
	});
};

exports.updateStudent = (id, data, cb) => {
	Student.findById(id, (err, student) => {
		if (err || !student) {
			cb({ status: 404 });
		} else {
			for (let i in data) {
				student[i] = data[i];
			}
			student.save((err, newStudent) => {
				err ? cb({ satus: 500, message: err }) : cb(null, newStudent);
			});
		}
	});
};

exports.deleteStudent = (id, cb) => {
	Student.findOneAndRemove({ _id: id }, (err, student) => {
		if (err || !student) {
			cb({ status: 404 });
		} else {
			Branch.updateOne(
				{ _id: student.branch },
				{
					$pull: {
						students: new String(student._id)
					}
				},
				err => {
					err ? cb({ status: 500, message: err }) : cb(null, student);
				}
			);
		}
	});
};
