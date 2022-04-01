const { Router } = require('express');
const jwt = require('jsonwebtoken');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');
const pool = require('../utils/pool');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })

  .get('/login/callback', async (req, res) => {
    const token = await exchangeCodeForToken(req.query.code);
    const { login, avatar_url } = await getGithubProfile(token);

    const user = await GithubUser.insert({
      username: login,
      photoUrl: avatar_url,
    });

    const payload = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });

    res
      .cookie(process.env.COOKIE_NAME, payload, {
        httpOnly: true,
        maxAge: 1440000,
      })
      .redirect('/api/v1/github/posts');
  })

  .get('/posts', (req, res) => {
    const cookie = req.cookies[process.env.COOKIE_NAME];
    if (!cookie) throw new Error('You must be signed in to continue');

    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    res.json(user);
  });
