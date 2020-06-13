const router = require('express').Router();
const { ensureAuthenticated } = require('../bin/auth');

router.get('/', ensureAuthenticated, (req, res) => {
	res.render('chairmanDashboard');
});

module.exports = router;
