const { Router } = require('express');
const jwt = require('jsonwebtoken');
const fetch = require('cross-fetch');
const pool = require('../utils/pool');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })

  .get('/login/callback', async (req, res) => {
    const resp = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
      }),
    });

    const { access_token } = await resp.json();

    const profile = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    const { avatar_url, login } = await profile.json();
  });
