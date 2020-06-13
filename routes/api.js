const router = require('express').Router();
const teachersAPI = require('../bin/teachersAPI');
const branchesAPI = require('../bin/branchesAPI');

router.get('/teachers', (req, res) => {
	teachersAPI.getTeachers((err, teachers) => {
		if (err) {
			res.status(500).json({
				success: false,
				error: 'Internal Server Error',
				message: err
			});
		} else {
			res.status(200).json({
				success: true,
				teachers,
				totalTeachers: teachers.length
			});
		}
	});
});

router.post('/teachers', (req, res) => {
	teachersAPI.createTeacher(req.body, (err, teacher) => {
		if (err && err.status === 422) {
			res.status(422).json({
				success: false,
				error: 422,
				message: 'unprocessable'
			});
		} else if (err && err.status === 500) {
			res.status(500).json({
				success: false,
				error: 'Internal Server Error',
				message: err
			});
		} else {
			res.status(200).json({
				success: true,
				teacher
			});
		}
	});
});

router.patch('/teachers/:id', (req, res) => {
	teachersAPI.updateTeacher(req.params.id, req.body, (err, teacher) => {
		if (err && err.status === 404) {
			res.status(404).json({
				success: false,
				error: 404,
				message: 'Not Found'
			});
		} else if (err && err.status === 500) {
			res.status(500).json({
				success: false,
				error: 'Internal Server Error',
				message: err.message
			});
		} else {
			res.status(200).json({
				success: true,
				teacher
			});
		}
	});
});

router.delete('/teachers/:id', (req, res) => {
	teachersAPI.deleteTeacher(req.params.id, (err, teacher) => {
		if (err) {
			res.status(404).json({
				success: false,
				error: 404,
				message: 'Not Found'
			});
		} else {
			res.status(200).json({
				success: true,
				teacher
			});
		}
	});
});

router.get('/branches', (req, res) => {
	branchesAPI.getBranches((err, branches) => {
		if (err) {
			res.status(500).json({
				success: false,
				error: 'Internal Server Error',
				message: err
			});
		} else {
			res.status(200).json({
				success: true,
				branches,
				totalBranches: branches.length
			});
		}
	});
});

router.post('/branches', (req, res) => {
	branchesAPI.createBranch(req.body, (err, branch) => {
		if (err && err.status === 422) {
			res.status(422).json({
				success: false,
				error: 422,
				message: 'unprocessable'
			});
		} else if (err && err.status === 500) {
			res.status(500).json({
				success: false,
				error: 'Internal Server Error',
				message: err.message
			});
		} else {
			res.status(200).json({
				success: true,
				branch
			});
		}
	});
});

router.patch('/branches/:id', (req, res) => {
	branchesAPI.updateBranch(req.params.id, req.body, (err, branch) => {
		if (err && err.status === 404) {
			res.status(404).json({
				success: false,
				error: 404,
				message: 'Not Found'
			});
		} else if (err && err.status === 500) {
			res.status(500).json({
				success: false,
				error: 'Internal Server Error',
				message: err.message
			});
		} else {
			res.status(200).json({
				success: true,
				branch
			});
		}
	});
});

router.delete('/branches/:id', (req, res) => {
	branchesAPI.deleteBranch(req.params.id, (err, branch) => {
		if (err) {
			res.status(404).json({
				success: false,
				error: 404,
				message: 'Not Found'
			});
		} else {
			res.status(200).json({
				success: true,
				branch
			});
		}
	});
});

module.exports = router;
