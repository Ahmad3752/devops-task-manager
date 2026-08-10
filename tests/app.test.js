const request = require('supertest');
const app = require('../src/app');

describe('Home page', () => {
  test('GET / returns HTTP 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });
});

describe('Health endpoint', () => {
  test('GET /health returns HTTP 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });

  test('GET /health returns { status: "ok" }', async () => {
    const res = await request(app).get('/health');
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('Tasks API', () => {
  test('GET /api/tasks returns an array', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/tasks creates a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Learn Jenkins' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: 'Learn Jenkins' });
    expect(res.body.id).toBeDefined();
  });

  test('GET /api/tasks includes the created task', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.body.some((task) => task.title === 'Learn Jenkins')).toBe(true);
  });

  test.each([
    ['missing title', {}],
    ['empty title', { title: '' }],
    ['whitespace title', { title: '   ' }],
    ['non-string title', { title: 123 }]
  ])('POST /api/tasks rejects %s', async (_name, body) => {
    const res = await request(app).post('/api/tasks').send(body);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
