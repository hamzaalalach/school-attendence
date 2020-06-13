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
		const res = await client.post('/teachers').send({
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
		const res = await client.post('/teachers').send({
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
		const res = await client.patch('/teachers/' + id).send({
			nom: 'nomTestNew'
		});
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data.teacher.nom).toBe('nomTestNew');
		done();
	});

	it('Should return 404 on patch teachers wrong id', async done => {
		const res = await client.patch('/teachers/1').send({
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
		const res = await client.get('/teachers');
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data.totalTeachers).toBe(1);
		expect(data).toHaveProperty('teachers');
		done();
	});

	it('Should return 200 on delete teachers', async done => {
		const res = await client.delete('/teachers/' + id);
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data.teacher._id).toBe(id);
		done();
	});

	it('Should return 404 on delete teachers wrong id', async done => {
		const res = await client.delete('/teachers/1');
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
		const res = await client.post('/branches').send({
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
		const res = await client.post('/branches').send({});
		const data = res.body;

		expect(res.statusCode).toEqual(422);
		expect(data.success).toBe(false);
		expect(data.error).toBe(422);
		expect(data.message).toBe('unprocessable');
		done();
	});

	it('Should return 200 on patch branches', async done => {
		const res = await client.patch('/branches/' + id).send({
			label: 'Data Litterature'
		});
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data.branch.label).toBe('Data Litterature');
		done();
	});

	it('Should return 404 on patch branches wrong id', async done => {
		const res = await client.patch('/branches/1').send({
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
		const res = await client.get('/branches');
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data).toHaveProperty('branches');
		expect(data.totalBranches).toBe(1);
		done();
	});

	it('Should return 200 on delete branches', async done => {
		const res = await client.delete('/branches/' + id);
		const data = res.body;

		expect(res.statusCode).toEqual(200);
		expect(data.success).toBe(true);
		expect(data.branch._id).toBe(id);
		done();
	});

	it('Should return 404 on delete branches wrong id', async done => {
		const res = await client.delete('/branches/1');
		const data = res.body;

		expect(res.statusCode).toEqual(404);
		expect(data.success).toBe(false);
		expect(data.message).toBe('Not Found');
		expect(data.error).toBe(404);
		done();
	});
});
