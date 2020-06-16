const Lesson = require('../models/Lesson');

exports.getLessons = cb => {
	Lesson.find({}, (err, lessons) => {
		err ? cb(err) : cb(null, lessons);
	});
};

exports.createLesson = (data, cb) => {
	Lesson.find({ intitule: data.intitule }, (err, exists) => {
		if (err) {
			cb({ status: 500 });
		} else if (exists.length != 0) {
			cb({ status: 409 });
		} else if (!data.intitule || !data.teacher) {
			cb({ status: 422 });
		} else {
			new Lesson(data).save((err, lesson) => {
				err ? cb({ status: 500 }) : cb(null, lesson);
			});
		}
	});
};

exports.updateLesson = (id, data, cb) => {
	Lesson.findById(id, (err, lesson) => {
		if (err) {
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
		err ? cb(err) : cb(null, lesson);
	});
};
