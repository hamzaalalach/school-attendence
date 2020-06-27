const Presence = require('../models/Presence');

exports.getPresences = (id, cb) => {
	Presence.find({ sessionId: id }, (err, presences) => {
		err ? cb(err) : cb(null, presences);
	});
};

exports.createPresence = (data, cb) => {
	Presence.find({ $and: [ { sessionId: data.sessionId }, { studentId: data.studentId } ] }, (err, exists) => {
		if (err) {
			cb({ status: 500 });
		} else if (exists.length != 0) {
			cb({ status: 409 });
		} else if (!data.sessionId || !data.studentId || typeof data.present != 'boolean') {
			cb({ status: 422 });
		} else {
			new Presence(data).save((err, presence) => {
				err ? cb(err) : cb(null, presence);
			});
		}
	});
};

exports.updatePresence = (id, data, cb) => {
	Presence.findById(id, (err, presence) => {
		if (err) {
			cb({ status: 404 });
		} else {
			for (let i in data) {
				presence[i] = data[i];
			}
			presence.save((err, newPresence) => {
				err ? cb({ status: 500 }) : cb(null, newPresence);
			});
		}
	});
};

exports.deletePresence = (id, cb) => {
	Presence.findOneAndRemove({ _id: id }, (err, presence) => {
		err ? cb(err) : cb(null, presence);
	});
};
