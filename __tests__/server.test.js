// __tests__/server.test.js
const request = require('supertest');
const app = require('../src/server/server.js'); // Adjust the path as necessary

describe('GET /', () => {
  it('should return a 200 status code and a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Welcome to the Travel App');
  });
});
