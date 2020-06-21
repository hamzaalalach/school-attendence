const router = require('express').Router();
const { ensureAuthenticated } = require('../bin/auth');

router.get('/', ensureAuthenticated, (req, res) => {
	res.render('studentsDashboard');
});

module.exports = router;
