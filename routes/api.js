const router = require('express').Router();
const abort = require('../bin/abort');
const teachersAPI = require('../bin/teachersAPI');
const branchesAPI = require('../bin/branchesAPI');
const lessonsAPI = require('../bin/lessonsAPI');
const sessionsAPI = require('../bin/sessionsAPI');
const studentsAPI = require('../bin/studentsAPI');
const presencesAPI = require('../bin/presencesAPI');

router.get('/teachers', (req, res) => {
	teachersAPI.getTeachers((err, teachers) => {
		if (err) {
			abort.internalServer(res, err);
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
			abort.unprocessable(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err);
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
			abort.notFound(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
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
			abort.notFound(res);
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
			abort.internalServer(res, err);
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
			abort.unprocessable(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
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
			abort.notFound(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
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
			abort.notFound(res);
		} else {
			res.status(200).json({
				success: true,
				branch
			});
		}
	});
});

router.get('/lessons', (req, res) => {
	lessonsAPI.getLessons((err, lessons) => {
		if (err) {
			abort.internalServer(res, err);
		} else {
			res.status(200).json({
				success: true,
				lessons,
				totalLessons: lessons.length
			});
		}
	});
});

router.post('/lessons', (req, res) => {
	lessonsAPI.createLesson(req.body, (err, lesson) => {
		if (err && err.status === 422) {
			abort.unprocessable(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
		} else if (err && err.status === 409) {
			abort.conflict(res);
		} else {
			res.status(200).json({
				success: true,
				lesson
			});
		}
	});
});

router.patch('/lessons/:id', (req, res) => {
	lessonsAPI.updateLesson(req.params.id, req.body, (err, lesson) => {
		if (err && err.status === 404) {
			abort.notFound(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
		} else {
			res.status(200).json({
				success: true,
				lesson
			});
		}
	});
});

router.delete('/lessons/:id', (req, res) => {
	lessonsAPI.deleteLesson(req.params.id, (err, lesson) => {
		if (err && err.status === 404) {
			abort.notFound(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
		} else {
			res.status(200).json({
				success: true,
				lesson
			});
		}
	});
});

router.get('/sessions', (req, res) => {
	sessionsAPI.getSessions((err, sessions) => {
		if (err) {
			abort.internalServer(res, err);
		} else {
			res.status(200).json({
				success: true,
				sessions,
				totalSessions: sessions.length
			});
		}
	});
});

router.post('/sessions', (req, res) => {
	sessionsAPI.createSession(req.body, (err, session) => {
		if (err && err.status === 422) {
			abort.unprocessable(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
		} else {
			res.status(200).json({
				success: true,
				session
			});
		}
	});
});

router.patch('/sessions/:id', (req, res) => {
	sessionsAPI.updateSession(req.params.id, req.body, (err, session) => {
		if (err && err.status === 404) {
			abort.notFound(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
		} else {
			res.status(200).json({
				success: true,
				session
			});
		}
	});
});

router.delete('/sessions/:id', (req, res) => {
	sessionsAPI.deleteSession(req.params.id, (err, session) => {
		if (err && err.status === 404) {
			abort.notFound(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
		} else {
			res.status(200).json({
				success: true,
				session
			});
		}
	});
});

router.get('/students', (req, res) => {
	studentsAPI.getStudents((err, students) => {
		if (err) {
			abort.internalServer(res, err);
		} else {
			res.status(200).json({
				success: true,
				students,
				totalStudents: students.length
			});
		}
	});
});

router.post('/students', (req, res) => {
	studentsAPI.createStudent(req.body, (err, student) => {
		if (err && err.status === 422) {
			abort.unprocessable(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
		} else if (err && err.status === 409) {
			abort.conflict(res);
		} else {
			res.status(200).json({
				success: true,
				student
			});
		}
	});
});

router.patch('/students/:id', (req, res) => {
	studentsAPI.updateStudent(req.params.id, req.body, (err, student) => {
		if (err && err.status === 404) {
			abort.notFound(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
		} else {
			res.status(200).json({
				success: true,
				student
			});
		}
	});
});

router.delete('/students/:id', (req, res) => {
	studentsAPI.deleteStudent(req.params.id, (err, student) => {
		if (err && err.status === 404) {
			abort.notFound(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
		} else {
			res.status(200).json({
				success: true,
				student
			});
		}
	});
});

router.get('/presences/:sessionId', (req, res) => {
	presencesAPI.getPresences(req.params.sessionId, (err, presences) => {
		if (err && err.status === 404) {
			abort.notFound(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
		} else {
			res.status(200).json({
				success: true,
				presences,
				totalPresences: presences.length
			});
		}
	});
});

router.post('/presences', (req, res) => {
	presencesAPI.createPresence(req.body, (err, presence) => {
		if (err && err.status === 422) {
			abort.unprocessable(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
		} else if (err && err.status === 409) {
			abort.conflict(res);
		} else {
			res.status(200).json({
				success: true,
				presence
			});
		}
	});
});

router.patch('/presences/:id', (req, res) => {
	presencesAPI.updatePresence(req.params.id, req.body, (err, presence) => {
		if (err && err.status === 404) {
			abort.notFound(res);
		} else if (err && err.status === 500) {
			abort.internalServer(res, err.message);
		} else {
			res.status(200).json({
				success: true,
				presence
			});
		}
	});
});

router.delete('/presences/:id', (req, res) => {
	presencesAPI.deletePresence(req.params.id, (err, presence) => {
		if (err) {
			abort.notFound(res);
		} else {
			res.status(200).json({
				success: true,
				presence
			});
		}
	});
});

module.exports = router;
