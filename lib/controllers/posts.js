const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .get('/', authenticate, async (req, res) => {
    const posts = await Post.getAll();
    res.send(posts);
  })

  .post('/', authenticate, async (req, res) => {
    const post = await Post.insert(req.user.username, req.body.text);
    res.send(post);
  });
