const Lesson = require('../models/Lesson');
const Teacher = require('../models/Teacher');
const Branch = require('../models/Branch');

exports.getLessons = cb => {
	Lesson.find({}, (err, lessons) => {
		err ? cb(err) : cb(null, lessons);
	});
};

exports.createLesson = (data, cb) => {
	Lesson.find({ intitule: data.intitule }, (err, exists) => {
		if (err) {
			cb({ status: 500, message: err });
		} else if (exists.length != 0) {
			cb({ status: 409 });
		} else if (!data.intitule || !data.teacher) {
			cb({ status: 422 });
		} else {
			new Lesson(data).save((err, lesson) => {
				if (err) {
					cb({ status: 500, message: err });
				} else {
					Teacher.findOneAndUpdate(
						{ _id: lesson.teacher },
						{
							$push: {
								courses: new String(lesson._id)
							}
						},
						err => {
							err ? cb({ status: 500, message: err }) : cb(null, lesson);
						}
					);
				}
			});
		}
	});
};

exports.updateLesson = (id, data, cb) => {
	Lesson.findById(id, (err, lesson) => {
		if (err || !lesson) {
			cb({ status: 404 });
		} else {
			for (let i in data) {
				lesson[i] = data[i];
			}
			lesson.save((err, newLesson) => {
				err ? cb({ status: 500 }) : cb(null, newLesson);
			});
		}
	});
};

exports.deleteLesson = (id, cb) => {
	Lesson.findOneAndRemove({ _id: id }, (err, lesson) => {
		if (err || !lesson) {
			cb({ status: 404 });
		} else {
			Teacher.findOneAndUpdate(
				{ _id: lesson.teacher },
				{
					$pull: {
						courses: new String(lesson._id)
					}
				},
				err => {
					err ? cb({ status: 500, message: err }) : cb(null, lesson);
				}
			);
		}
	});
};

exports.addBranch = (id, data, cb) => {
	Lesson.findById(id, err => {
		if (err) {
			cb({ status: 404 });
		} else {
			Branch.findOneAndUpdate(
				{ _id: data.id },
				{
					$push: {
						lessons: new String(id)
					}
				},
				err => {
					if (err) {
						cb({ status: 500, message: err });
					} else {
						Lesson.findByIdAndUpdate(
							id,
							{
								$push: {
									branches: new String(data.id)
								}
							},
							{ new: true },
							(err, newLesson) => {
								err ? cb({ status: 500, message: err }) : cb(null, newLesson);
							}
						);
					}
				}
			);
		}
	});
};

exports.removeBranch = (lessonId, branchId, cb) => {
	Lesson.findById(lessonId, err => {
		if (err) {
			cb({ status: 404 });
		} else {
			Branch.findByIdAndUpdate(
				branchId,
				{
					$pull: {
						lessons: new String(lessonId)
					}
				},
				err => {
					if (err) {
						cb({ status: 500, message: err });
					} else {
						Lesson.findByIdAndUpdate(
							lessonId,
							{
								$pull: {
									branches: new String(branchId)
								}
							},
							{ new: true },
							(err, newLesson) => {
								err ? cb({ status: 500, message: err }) : cb(null, newLesson);
							}
						);
					}
				}
			);
		}
	});
};
