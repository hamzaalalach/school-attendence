const router = require('express').Router();
const { ensureAuthenticated } = require('../bin/auth');

router.get('/', ensureAuthenticated, (req, res) => {
	res.redirect('/chairman/teachers');
});

router.get('/teachers', ensureAuthenticated, (req, res) => {
	res.render('teachersDashboard');
});

router.get('/branches', ensureAuthenticated, (req, res) => {
	res.render('branchesDashboard');
});

module.exports = router;
