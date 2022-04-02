const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('backend-gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to the github oauth page upon login', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });

  it('should login and redirect users to /api/v1/posts', async () => {
    const agent = request.agent(app);

    const res = await agent
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          text: 'my first fake post. hooray!',
          username: 'fake_github_user',
        },
      ])
    );
  });

  it('should logout a user on DELETE request to /api/v1/github', async () => {
    const agent = request.agent(app);

    // Log a user in
    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    // Return a logout message on delete
    let res = await agent.delete('/api/v1/github');
    expect(res.body).toEqual({ message: 'Logged out successfully' });

    // Check that the user is logged out by returning an error on authenticated route
    res = await agent.get('/api/v1/posts');
    expect(res.status).toEqual(401);
  });

  it('should allow authenticated users to create new posts', async () => {
    const agent = request.agent(app);

    const user = await agent
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    const res = await agent.post('/api/v1/posts').send({
      username: user.body.username,
      text: 'another fake post. Not fun any more.',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      text: 'another fake post. Not fun any more.',
      username: 'fake_github_user',
    });
  });
});
