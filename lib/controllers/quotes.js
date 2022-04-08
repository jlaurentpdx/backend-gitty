const { Router } = require('express');
const QuoteService = require('../services/QuoteService');
const fetch = require('cross-fetch');

module.exports = Router().get('/', (req, res, next) => {
  return Promise.all(QuoteService.apiList.map((api) => fetch(api)))
    .then((resp) => Promise.all(resp.map((data) => data.json())))
    .then((resp) => resp.map((data, index) => QuoteService.parse(data, index)))
    .then((resp) => res.send(resp))
    .catch((error) => next(error));
});
