const router = require('express').Router();
const { ensureAuthenticated } = require('../bin/auth');
const canAccess = require('../bin/rbac');

router.get('/teachers', ensureAuthenticated, (req, res) => {
	canAccess(req.user, 'teachers') ? res.render('teachersDashboard') : res.redirect('/');
});

router.get('/branches', ensureAuthenticated, (req, res) => {
	canAccess(req.user, 'branches') ? res.render('branchesDashboard') : res.redirect('/');
});

router.get('/students', ensureAuthenticated, (req, res) => {
	canAccess(req.user, 'students') ? res.render('studentsDashboard') : res.redirect('/');
});

router.get('/lessons', ensureAuthenticated, (req, res) => {
	canAccess(req.user, 'lessons') ? res.render('lessonsDashboard') : res.redirect('/');
});

router.get('/sessions', ensureAuthenticated, (req, res) => {
	canAccess(req.user, 'sessions') ? res.render('sessionsDashboard') : res.redirect('/');
});

router.get('/sessions', ensureAuthenticated, (req, res) => {
	canAccess(req.user, 'sessions') ? res.render('sessionsDashboard') : res.redirect('/');
});

router.get('/presences', ensureAuthenticated, (req, res) => {
	canAccess(req.user, 'presence') ? res.render('presencesDashboard') : res.redirect('/');
});

router.get('/presences-list', ensureAuthenticated, (req, res) => {
	canAccess(req.user, 'presence') ? res.render('listDashboard') : res.redirect('/');
});

module.exports = router;
