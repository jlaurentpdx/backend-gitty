const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');
const pool = require('../utils/pool');

module.exports = Router().get('/', authenticate, async (req, res) => {
  const posts = await Post.getAll();
  res.send(posts);
});
