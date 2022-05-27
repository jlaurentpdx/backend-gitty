const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('quotes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should display a list of three quotes from GET /api/v1/quotes', async () => {
    const expected = [
      { author: expect.any(String), content: expect.any(String) },
      { author: expect.any(String), content: expect.any(String) },
      { author: expect.any(String), content: expect.any(String) },
    ];

    const res = await request(app).get('/api/v1/quotes');
    expect(res.body).toEqual(expected);
  });
});
