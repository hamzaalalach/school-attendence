const mongoose = require('mongoose');
const uri = 'mongodb://dbUser:dbPass00@ds133127.mlab.com:33127/schoolattendance';

exports.connectDB = () => {
	var db = mongoose.connection;

	if (db.readyState == 1) {
		return db;
	} else if (db.readyState != 2) {
		mongoose.connect(uri, {
			useNewUrlParser: true,
			reconnectTries: Number.MAX_VALUE,
			reconnectInterval: 1000,
			useFindAndModify: false
		});
		db.on('error', console.error.bind(console, 'Connection error:'));
		db.once('open', () => {
			console.log('DB connected!');
		});
	}
	return db;
};
