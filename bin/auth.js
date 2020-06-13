const passport = require('passport');

module.exports = {
	ensureAuthenticated: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		// req.flash('error', 'You must log in to continue');
		res.redirect('/');
	},
	forwardAuthenticated: function(req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		}
		res.redirect('/dashboard');
	}
};
