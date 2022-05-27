const { Router } = require('express');
const QuoteService = require('../services/QuoteService');

module.exports = Router().get('/', (req, res, next) => {
  return QuoteService.fetchQuotes()
    .then((resp) => res.send(resp))
    .catch((error) => next(error));
});
