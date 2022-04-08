const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .get('/', authenticate, (req, res, next) => {
    return Post.getAll()
      .then((posts) => res.send(posts))
      .catch((error) => next(error));
  })

  .post('/', authenticate, (req, res, next) => {
    return Post.insert(req.user.username, req.body.text)
      .then((post) => res.send(post))
      .catch((error) => next(error));
  });
