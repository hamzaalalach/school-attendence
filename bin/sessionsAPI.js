const Session = require('../models/Session');
const { session } = require('passport/lib');

exports.getSessions = cb => {
	Session.find({}, (err, sessions) => {
		err ? cb(err) : cb(null, sessions);
	});
};

exports.createSession = (data, cb) => {
	if (!data.salle || !data.heure || !data.date || !data.lesson) {
		cb({ status: 422 });
	} else {
		new Session(data).save((err, session) => {
			err ? cb({ status: 500, message: err }) : cb(null, session);
		});
	}
};

exports.updateSession = (id, data, cb) => {
	Session.findById(id, (err, session) => {
		if (err) {
			cb({ stauts: 404 });
		} else {
			for (let i in data) {
				session[i] = data[i];
			}
			session.save((err, newSession) => {
				err ? cb({ status: 500, message: err }) : cb(null, newSession);
			});
		}
	});
};

exports.deleteSession = (id, cb) => {
	Session.findOneAndRemove({ _id: id }, (err, session) => {
		err ? cb({ status: 404 }) : cb(null, session);
	});
};
