const request = require('supertest');
const app = require('../src/server/server');

describe('GET /', () => {
  it('should return a 200 status code and contain the text "Welcome to the Travel App"', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('<h1>Travel Planner</h1>');
  });
});
