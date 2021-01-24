const LocalStrategy = require('passport-local').Strategy,
	bcrypt = require('bcrypt'),
	User = require('../models/User');

module.exports = passport => {
	passport.use(
		'local.user',
		new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
			User.findOne({
				email
			}).then(user => {
				if (!user) {
					return done(null, false, { message: "The email address that you've entered doesn't match any account" });
				}

				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (err) throw err;
					if (isMatch) {
						return done(null, user);
					} else {
						return done(null, false, { message: "The password that you've entered is incorrect" });
					}
				});
			});
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
