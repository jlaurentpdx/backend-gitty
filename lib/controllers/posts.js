const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');
const pool = require('../utils/pool');

module.exports = Router()
  .get('/', authenticate, async (req, res) => {
    const posts = await Post.getAll();
    res.send(posts);
  })

  .post('/', authenticate, async (req, res) => {
    const username = req.user.username;
    const text = req.body.text;

    const { rows } = await pool.query(
      `
    INSERT INTO
      posts (username, text)
    VALUES
      ($1, $2)
    RETURNING 
      *
    `,
      [username, text]
    );

    res.send(rows[0]);
  });
