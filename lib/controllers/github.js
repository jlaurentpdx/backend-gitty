const { Router } = require('express');
const { sign } = require('../utils/jwt');
const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })

  .get('/login/callback', async (req, res, next) => {
    try {
      const user = await UserService.create(req.query.code);

      res
        .cookie(process.env.COOKIE_NAME, sign(user), {
          httpOnly: true,
          maxAge: 1440000,
        })
        .redirect('/api/v1/posts');
    } catch (error) {
      next(error);
    }
  })

  .delete('/', authenticate, async (req, res, next) => {
    try {
      res
        .clearCookie(process.env.COOKIE_NAME)
        .send({ message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  });
