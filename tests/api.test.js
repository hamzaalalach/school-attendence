const app = require('../index');
const request = require('supertest');
const db = require('../bin/db');
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
			prenom: 'prenomTest'
		});
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data.teacher.nom).toBe('nomTest');
		id = data.teacher._id;
		done();
	});

	it('Should return 422 on post teachers missing data', async done => {
		const res = await client.post('/api/teachers').send({
			nom: 'nomTest'
		});
		const data = res.body;

		expect(res.statusCode).toEqual(422);
		expect(data.success).toBe(false);
		expect(data.error).toBe(422);
		expect(data.message).toBe('unprocessable');
		done();
	});

	it('Should return 200 on patch teacher', async done => {
		const res = await client.patch('/api/teachers/' + id).send({
			nom: 'nomTestNew'
		});
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data.teacher.nom).toBe('nomTestNew');
		done();
	});

	it('Should return 404 on patch teachers wrong id', async done => {
		const res = await client.patch('/api/teachers/1').send({
			nom: 'nomTestNew'
		});
		const data = res.body;

		expect(res.statusCode).toEqual(404);
		expect(data.success).toBe(false);
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});

	it('Should return 200 on get teachers', async done => {
		const res = await client.get('/api/teachers');
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data.totalTeachers).toBe(2);
		expect(data).toHaveProperty('teachers');
		done();
	});

	it('Should return 200 on delete teachers', async done => {
		const res = await client.delete('/api/teachers/' + id);
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data.teacher._id).toBe(id);
		done();
	});

	it('Should return 404 on delete teachers wrong id', async done => {
		const res = await client.delete('/api/teachers/1');
		const data = res.body;

		expect(res.statusCode).toEqual(404);
		expect(data.success).toBe(false);
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});
});

describe('Branches endpoints', () => {
	let id;

	it('Should return 200 on post branches', async done => {
		const res = await client.post('/api/branches').send({
			label: 'Data Science'
		});
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data.branch.label).toBe('Data Science');
		id = data.branch._id;
		done();
	});

	it('Should return 422 on post branches missing data', async done => {
		const res = await client.post('/api/branches').send({});
		const data = res.body;

		expect(res.statusCode).toEqual(422);
		expect(data.success).toBe(false);
		expect(data.error).toBe(422);
		expect(data.message).toBe('unprocessable');
		done();
	});

	it('Should return 200 on patch branches', async done => {
		const res = await client.patch('/api/branches/' + id).send({
			label: 'Data Litterature'
		});
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data.branch.label).toBe('Data Litterature');
		done();
	});

	it('Should return 404 on patch branches wrong id', async done => {
		const res = await client.patch('/api/branches/1').send({
			label: 'Data Something'
		});
		const data = res.body;

		expect(res.statusCode).toEqual(404);
		expect(data.success).toBe(false);
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});

	it('Should return 200 on get branches', async done => {
		const res = await client.get('/api/branches');
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data).toHaveProperty('branches');
		expect(data.totalBranches).toBe(1);
		done();
	});

	it('Should return 200 on delete branches', async done => {
		const res = await client.delete('/api/branches/' + id);
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data.branch._id).toBe(id);
		done();
	});

	it('Should return 404 on delete branches wrong id', async done => {
		const res = await client.delete('/api/branches/1');
		const data = res.body;

		expect(res.statusCode).toEqual(404);
		expect(data.success).toBe(false);
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

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data).toHaveProperty('lesson');
		expect(data.lesson.intitule).toBe('Cours 1');
		id = data.lesson._id;
		done();
	});

	it('Should return 422 on post lessons missing data', async done => {
		const res = await client.post('/api/lessons').send({});
		const data = res.body;

		expect(res.statusCode).toEqual(422);
		expect(data.success).toBe(false);
		expect(data.error).toBe(422);
		expect(data.message).toBe('unprocessable');
		done();
	});

	it('Should return 422 on post lessons duplicated intitule', async done => {
		const res = await client.post('/api/lessons').send({
			intitule: 'Cours 1',
			teacher: '5eea9cc11339ef1a79207a9c'
		});
		const data = res.body;

		expect(res.statusCode).toEqual(409);
		expect(data.success).toBe(false);
		expect(data.error).toBe(409);
		expect(data.message).toBe('Conflict');
		done();
	});

	it('Should return 200 on patch lessons', async done => {
		const res = await client.patch('/api/lessons/' + id).send({
			intitule: 'Cours 2'
		});
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data.lesson.intitule).toBe('Cours 2');
		expect(data.lesson._id).toBe(id);
		done();
	});

	it('Should return 404 on patch lessons wrong id', async done => {
		const res = await client.patch('/api/lessons/1').send({
			intitule: 'Data Something'
		});
		const data = res.body;

		expect(res.statusCode).toEqual(404);
		expect(data.success).toBe(false);
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});

	it('Should return 200 on get lessons', async done => {
		const res = await client.get('/api/lessons');
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data).toHaveProperty('lessons');
		expect(data.totalLessons).toBe(2);
		done();
	});

	it('Should return 200 on delete lessons', async done => {
		const res = await client.delete('/api/lessons/' + id);
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data).toHaveProperty('lesson');
		expect(data.lesson._id).toBe(id);
		done();
	});

	it('Should return 404 on delete lessons wrong id', async done => {
		const res = await client.delete('/api/lessons/1');
		const data = res.body;

		expect(res.statusCode).toEqual(404);
		expect(data.success).toBe(false);
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

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data).toHaveProperty('session');
		expect(data.session.salle).toBe('Salle 1');
		expect(data.session.heure).toBe('8-10');
		expect(data.session).toHaveProperty('date');
		expect(data.session.lesson).toBe('5eea9d099924bc1ac34ca553');
		id = data.session._id;
		done();
	});

	it('Should return 422 on post sessions missing data', async done => {
		const res = await client.post('/api/sessions').send({});
		const data = res.body;

		expect(res.statusCode).toEqual(422);
		expect(data.success).toBe(false);
		expect(data.error).toBe(422);
		expect(data.message).toBe('unprocessable');
		done();
	});

	it('Should return 200 on patch sessions', async done => {
		const res = await client.patch('/api/sessions/' + id).send({
			salle: 'Salle 2'
		});
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
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

		expect(res.statusCode).toEqual(404);
		expect(data.success).toBe(false);
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});

	it('Should return 200 on get sessions', async done => {
		const res = await client.get('/api/sessions');
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data).toHaveProperty('sessions');
		expect(data.totalSessions).toBe(1);
		done();
	});

	it('Should return 200 on delete sessions', async done => {
		const res = await client.delete('/api/sessions/' + id);
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data).toHaveProperty('session');
		expect(data.session._id).toBe(id);
		done();
	});

	it('Should return 404 on delete sessions wrong id', async done => {
		const res = await client.delete('/api/sessions/1');
		const data = res.body;

		expect(res.statusCode).toEqual(404);
		expect(data.success).toBe(false);
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});
});
