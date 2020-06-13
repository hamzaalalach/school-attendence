const express = require('express'),
	router = express.Router(),
	usersAPI = require('../bin/userAPI'),
	passport = require('passport');

router.get('/login', (req, res) => {
	// usersAPI.createUser(
	// 	{
	// 		firstName: 'Hamza',
	// 		lastName: 'Alalach',
	// 		email: 'hamzaalalach@gmail.com',
	// 		password: '43898561',
	// 		mode: 'chairman'
	// 	},
	// 	(err, user) => {
	// 		if (err) {
	// 			console.log(err);
	// 		} else {
	// 			console.log(user);
	// 		}
	// 	}
	// );
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local.chairman', function(err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(404).end();
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			return res.redirect('/chairman');
		});
	})(req, res, next);
});

router.post('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
