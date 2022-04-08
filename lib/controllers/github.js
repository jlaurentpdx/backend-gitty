const { Router } = require('express');
const { sign } = require('../utils/jwt');
const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24; // milliseconds, seconds, minutes, hours

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })

  .get('/login/callback', (req, res, next) => {
    return UserService.create(req.query.code)
      .then((user) =>
        res
          .cookie(process.env.COOKIE_NAME, sign(user), {
            httpOnly: true,
            maxAge: ONE_DAY_IN_MS,
          })
          .redirect('/api/v1/posts')
      )
      .catch((error) => next(error));
  })

  .delete('/', authenticate, (req, res, next) => {
    return res
      .clearCookie(process.env.COOKIE_NAME)
      .send({ message: 'Logged out successfully' })
      .catch((error) => next(error));
  });
