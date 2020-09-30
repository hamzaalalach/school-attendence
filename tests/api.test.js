const app = require('../index');
const request = require('supertest');
const db = require('../bin/db');
const Teacher = require('../models/Teacher');
const Branch = require('../models/Branch');
const Lesson = require('../models/Lesson');
let client;

beforeAll(async () => {
	await db.connectDB();
	client = request(app);
});

describe('Teachers endpoints', () => {
	let id;

	it('Should return 200 on post teachers', async done => {
		const res = await client.post('/api/teachers').send({
			nom: 'nomTest',
			prenom: 'prenomTest',
			email: 'email@example.com',
			adresse: 'Street number n',
			telephone: '0600000000'
		});
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('teacher');
		expect(data.teacher.nom).toBe('nomTest');
		expect(data.teacher.prenom).toBe('prenomTest');
		expect(data.teacher.email).toBe('email@example.com');
		expect(data.teacher.adresse).toBe('Street number n');
		expect(data.teacher.telephone).toBe('0600000000');
		id = data.teacher._id;
		done();
	});

	it('Should return 422 on post teachers missing data', async done => {
		const res = await client.post('/api/teachers').send({
			nom: 'nomTest'
		});
		const data = res.body;

		expect(res.statusCode).toBe(422);
		expect(data.success).toBeFalsy();
		expect(data.error).toBe(422);
		expect(data.message).toBe('unprocessable');
		done();
	});

	it('Should return 200 on patch teacher', async done => {
		const res = await client.patch('/api/teachers/' + id).send({
			nom: 'nomTestNew'
		});
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data.teacher.nom).toBe('nomTestNew');
		done();
	});

	it('Should return 404 on patch teachers wrong id', async done => {
		const res = await client.patch('/api/teachers/1').send({
			nom: 'nomTestNew'
		});
		const data = res.body;

		expect(res.statusCode).toBe(404);
		expect(data.success).toBeFalsy();
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});

	it('Should return 200 on get teachers', async done => {
		const res = await client.get('/api/teachers');
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data.totalTeachers).toBe(3);
		expect(data).toHaveProperty('teachers');
		done();
	});

	it('Should return 200 on delete teachers', async done => {
		const res = await client.delete('/api/teachers/' + id);
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data.teacher._id).toBe(id);
		done();
	});

	it('Should return 404 on delete teachers wrong id', async done => {
		const res = await client.delete('/api/teachers/1');
		const data = res.body;

		expect(res.statusCode).toBe(404);
		expect(data.success).toBeFalsy();
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});
});

describe('Branches endpoints', () => {
	let id;

	it('Should return 200 on post branches', async done => {
		const res = await client.post('/api/branches').send({
			label: 'Data Science',
			coordonnateur: 'Someone'
		});
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('branch');
		expect(data.branch.label).toBe('Data Science');
		expect(data.branch.coordonnateur).toBe('Someone');

		id = data.branch._id;
		done();
	});

	it('Should return 422 on post branches missing data', async done => {
		const res = await client.post('/api/branches').send({});
		const data = res.body;

		expect(res.statusCode).toBe(422);
		expect(data.success).toBeFalsy();
		expect(data.error).toBe(422);
		expect(data.message).toBe('unprocessable');
		done();
	});

	it('Should return 200 on post lesson to branch', async done => {
		const res = await client.post(`/api/branches/${id}/lessons`).send({
			id: '5eea9d099924bc1ac34ca553'
		});
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('branch');
		expect(data.branch.lessons).toContain('5eea9d099924bc1ac34ca553');
		Lesson.findById('5eea9d099924bc1ac34ca553', (err, lesson) => {
			expect(lesson.branches).toContain(id);
			done();
		});
	});

	it('Should return 200 on delete lesson from branch', async done => {
		const res = await client.delete(`/api/branches/${id}/lessons/5eea9d099924bc1ac34ca553`);
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('branch');
		expect(data.branch.lessons).not.toContain('5eea9d099924bc1ac34ca553');
		Lesson.findById('5eea9d099924bc1ac34ca553', (err, lesson) => {
			expect(lesson.branches).not.toContain(id);
			done();
		});
	});

	it('Should return 200 on patch branches', async done => {
		const res = await client.patch('/api/branches/' + id).send({
			label: 'Data Litterature'
		});
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data.branch.label).toBe('Data Litterature');
		done();
	});

	it('Should return 404 on patch branches wrong id', async done => {
		const res = await client.patch('/api/branches/1').send({
			label: 'Data Something'
		});
		const data = res.body;

		expect(res.statusCode).toBe(404);
		expect(data.success).toBeFalsy();
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});

	it('Should return 200 on get branches', async done => {
		const res = await client.get('/api/branches');
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('branches');
		expect(data.totalBranches).toBe(2);
		done();
	});

	it('Should return 200 on delete branches', async done => {
		const res = await client.delete('/api/branches/' + id);
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data.branch._id).toBe(id);
		done();
	});

	it('Should return 404 on delete branches wrong id', async done => {
		const res = await client.delete('/api/branches/1');
		const data = res.body;

		expect(res.statusCode).toBe(404);
		expect(data.success).toBeFalsy();
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});
});

describe('Lessons endpoints', () => {
	let id;

	it('Should return 200 on post lessons', async done => {
		const res = await client.post('/api/lessons').send({
			intitule: 'Cours 1',
			teacher: '5eea9cc11339ef1a79207a9c'
		});
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('lesson');
		expect(data.lesson.intitule).toBe('Cours 1');
		id = data.lesson._id;
		Teacher.findById(data.lesson.teacher, (err, teacher) => {
			expect(teacher.courses).toContain(id);
			done();
		});
	});

	it('Should return 422 on post lessons missing data', async done => {
		const res = await client.post('/api/lessons').send({});
		const data = res.body;

		expect(res.statusCode).toBe(422);
		expect(data.success).toBeFalsy();
		expect(data.error).toBe(422);
		expect(data.message).toBe('unprocessable');
		done();
	});

	it('Should return 409 on post lessons duplicated intitule', async done => {
		const res = await client.post('/api/lessons').send({
			intitule: 'Cours 1',
			teacher: '5eea9cc11339ef1a79207a9c'
		});
		const data = res.body;

		expect(res.statusCode).toBe(409);
		expect(data.success).toBeFalsy();
		expect(data.error).toBe(409);
		expect(data.message).toBe('Conflict');
		done();
	});

	it('Should return 200 on post branch to lesson', async done => {
		const res = await client.post('/api/lessons/' + id + '/branches').send({
			id: '5efa8273b609b86631715ab5'
		});
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('lesson');
		expect(data.lesson.branches).toContain('5efa8273b609b86631715ab5');
		Branch.findById('5efa8273b609b86631715ab5', (err, branch) => {
			expect(branch.lessons).toContain(id);
			done();
		});
	});

	it('Should return 200 on delete branch from lesson', async done => {
		const res = await client.delete('/api/lessons/' + id + '/branches/5efa8273b609b86631715ab5');
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('lesson');
		expect(data.lesson.branches).not.toContain('5efa8273b609b86631715ab5');
		Branch.findById('5efa8273b609b86631715ab5', (err, branch) => {
			expect(branch.lessons).not.toContain(id);
			done();
		});
	});

	it('Should return 200 on patch lessons', async done => {
		const res = await client.patch('/api/lessons/' + id).send({
			intitule: 'Cours 2'
		});
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data.lesson.intitule).toBe('Cours 2');
		expect(data.lesson._id).toBe(id);
		done();
	});

	it('Should return 404 on patch lessons wrong id', async done => {
		const res = await client.patch('/api/lessons/1').send({
			intitule: 'Data Something'
		});
		const data = res.body;

		expect(res.statusCode).toBe(404);
		expect(data.success).toBeFalsy();
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});

	it('Should return 200 on get lessons', async done => {
		const res = await client.get('/api/lessons');
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('lessons');
		expect(data.totalLessons).toBe(2);
		done();
	});

	it('Should return 200 on delete lessons', async done => {
		const res = await client.delete('/api/lessons/' + id);
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('lesson');
		expect(data.lesson._id).toBe(id);
		Teacher.findById(data.lesson.teacher, (err, teacher) => {
			expect(teacher.courses).not.toContain(id);
			done();
		});
	});

	it('Should return 404 on delete lessons wrong id', async done => {
		const res = await client.delete('/api/lessons/1');
		const data = res.body;

		expect(res.statusCode).toBe(404);
		expect(data.success).toBeFalsy();
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});
});

describe('Sessions endpoints', () => {
	let id;

	it('Should return 200 on post sessions', async done => {
		const res = await client.post('/api/sessions').send({
			salle: 'Salle 1',
			heure: '8-10',
			date: new Date(),
			lesson: '5eea9d099924bc1ac34ca553'
		});
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('session');
		expect(data.session.salle).toBe('Salle 1');
		expect(data.session.heure).toBe('8-10');
		expect(data.session).toHaveProperty('date');
		expect(data.session.lesson).toBe('5eea9d099924bc1ac34ca553');
		id = data.session._id;
		Lesson.findById(data.session.lesson, (err, lesson) => {
			expect(lesson.sessions).toContain(id);
			done();
		});
	});

	it('Should return 422 on post sessions missing data', async done => {
		const res = await client.post('/api/sessions').send({});
		const data = res.body;

		expect(res.statusCode).toBe(422);
		expect(data.success).toBeFalsy();
		expect(data.error).toBe(422);
		expect(data.message).toBe('unprocessable');
		done();
	});

	it('Should return 200 on patch sessions', async done => {
		const res = await client.patch('/api/sessions/' + id).send({
			salle: 'Salle 2'
		});
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('session');
		expect(data.session.salle).toBe('Salle 2');
		expect(data.session.heure).toBe('8-10');
		done();
	});

	it('Should return 404 on patch sessions wrong id', async done => {
		const res = await client.patch('/api/sessions/1').send({
			heure: '10-12'
		});
		const data = res.body;

		expect(res.statusCode).toBe(404);
		expect(data.success).toBeFalsy();
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});

	it('Should return 200 on get sessions', async done => {
		const res = await client.get('/api/sessions');
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('sessions');
		expect(data.totalSessions).toBe(2);
		done();
	});

	it('Should return 200 on delete sessions', async done => {
		const res = await client.delete('/api/sessions/' + id);
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('session');
		expect(data.session._id).toBe(id);
		Lesson.findById(data.session.lesson, (err, lesson) => {
			expect(lesson.sessions).not.toContain(id);
			done();
		});
	});

	it('Should return 404 on delete sessions wrong id', async done => {
		const res = await client.delete('/api/sessions/1');
		const data = res.body;

		expect(res.statusCode).toBe(404);
		expect(data.success).toBeFalsy();
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});
});

describe('Students endpoints', () => {
	let id;

	it('Should return 200 on post students', async done => {
		const res = await client.post('/api/students').send({
			matricule: '032898A',
			nom: 'Alalach',
			prenom: 'Hamza',
			branch: '5efa8273b609b86631715ab5'
		});
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('student');
		expect(data.student.branch).toBe('5efa8273b609b86631715ab5');
		expect(data.student.matricule).toBe('032898A');
		expect(data.student.nom).toBe('Alalach');
		expect(data.student.prenom).toBe('Hamza');
		id = data.student._id;
		Branch.findById(data.student.branch, (err, branch) => {
			expect(branch.students).toContain(id);
			done();
		});
	});

	it('Should return 422 on post students missing data', async done => {
		const res = await client.post('/api/students').send({});
		const data = res.body;

		expect(res.statusCode).toBe(422);
		expect(data.success).toBeFalsy();
		expect(data.error).toBe(422);
		expect(data.message).toBe('unprocessable');
		done();
	});

	it('Should return 409 on post students duplicated matricule', async done => {
		const res = await client.post('/api/students').send({
			matricule: '032898A',
			nom: 'nom',
			prenom: 'prenom',
			branch: '5efa8273b609b86631715ab5'
		});
		const data = res.body;

		expect(res.statusCode).toBe(409);
		expect(data.success).toBeFalsy();
		expect(data.error).toBe(409);
		expect(data.message).toBe('Conflict');
		done();
	});

	it('Should return 200 on patch students', async done => {
		const res = await client.patch('/api/students/' + id).send({
			matricule: '032898B',
			nom: 'Alalach mod'
		});
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('student');
		expect(data.student.matricule).toBe('032898B');
		expect(data.student.nom).toBe('Alalach mod');
		expect(data.student._id).toBe(id);
		done();
	});

	it('Should return 404 on patch students wrong id', async done => {
		const res = await client.patch('/api/students/1').send({
			nom: 'new name'
		});
		const data = res.body;

		expect(res.statusCode).toBe(404);
		expect(data.success).toBeFalsy();
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});

	it('Should return 200 on get students', async done => {
		const res = await client.get('/api/students');
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('students');
		expect(data.totalStudents).toBe(2);
		done();
	});

	it('Should return 200 on delete students', async done => {
		const res = await client.delete('/api/students/' + id);
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('student');
		expect(data.student._id).toBe(id);
		Branch.findById(data.student.branch, (err, branch) => {
			expect(branch.students).not.toContain(id);
			done();
		});
	});

	it('Should return 404 on delete students wrong id', async done => {
		const res = await client.delete('/api/students/1');
		const data = res.body;

		expect(res.statusCode).toBe(404);
		expect(data.success).toBeFalsy();
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});
});

describe('Presence Endpoints', () => {
	let id;

	it('Should return 200 on post presences', async done => {
		const res = await client.post('/api/presences').send({
			studentId: '5ef76589b22d4c4854f3e6aa',
			sessionId: '5ef76610b22d4c4854f3e6ab',
			present: false
		});
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('presence');
		expect(data.presence.studentId).toBe('5ef76589b22d4c4854f3e6aa');
		expect(data.presence.sessionId).toBe('5ef76610b22d4c4854f3e6ab');
		expect(data.presence.present).toBeFalsy();
		id = data.presence._id;
		done();
	});

	it('Should return 409 on post presences duplicated record', async done => {
		const res = await client.post('/api/presences').send({
			studentId: '5ef76589b22d4c4854f3e6aa',
			sessionId: '5ef76610b22d4c4854f3e6ab',
			present: true
		});
		const data = res.body;

		expect(res.statusCode).toBe(409);
		expect(data.success).toBeFalsy();
		expect(data.error).toBe(409);
		expect(data.message).toBe('Conflict');
		done();
	});

	it('Should return 422 on post presences missing data', async done => {
		const res = await client.post('/api/presences').send({
			studentId: '5ef76589b22d4c4854f3e6aa',
			sessionId: '5ef76610b22d4c4854f3e6ac'
		});
		const data = res.body;

		expect(res.statusCode).toBe(422);
		expect(data.success).toBeFalsy();
		expect(data.error).toBe(422);
		expect(data.message).toBe('unprocessable');
		done();
	});

	it('Should return 200 on patch presences', async done => {
		const res = await client.patch('/api/presences/' + id).send({
			present: true
		});
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('presence');
		expect(data.presence.present).toBeTruthy();
		expect(data.presence._id).toBe(id);
		done();
	});

	it('Should return 404 on patch presences wrong id', async done => {
		const res = await client.patch('/api/presences/1').send({
			present: true
		});
		const data = res.body;

		expect(res.statusCode).toBe(404);
		expect(data.success).toBeFalsy();
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});

	it('Should return 200 on get presences', async done => {
		const res = await client.get('/api/presences/5ef76610b22d4c4854f3e6ab');
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('presences');
		expect(data.totalPresences).toBe(1);
		done();
	});

	it('Should return 404 on wrong session id', async done => {
		const res = await client.get('/api/presences/1');
		const data = res.body;

		expect(res.statusCode).toBe(404);
		expect(data.success).toBeFalsy();
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});

	it('Should return 200 on delete presences', async done => {
		const res = await client.delete('/api/presences/' + id);
		const data = res.body;

		expect(res.statusCode).toBe(200);
		expect(data.success).toBeTruthy();
		expect(data).toHaveProperty('presence');
		expect(data.presence._id).toBe(id);
		done();
	});
});
