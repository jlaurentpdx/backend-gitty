const { Router } = require('express');
const fetch = require('cross-fetch');

module.exports = Router().get('/', (req, res, next) => {
  return fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
    .then((resp) => resp.json())
    .then((resp) => res.send(resp))
    .catch((error) => next(error));
});
