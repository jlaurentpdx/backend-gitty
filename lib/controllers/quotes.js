const { Router } = require('express');
const fetch = require('cross-fetch');

module.exports = Router().get('/', (req, res, next) => {
  const services = (obj) => {
    const { author, en } = obj;
    return { author, content: en };
  };

  const apis = [
    'https://programming-quotes-api.herokuapp.com/quotes/random',
    'https://programming-quotes-api.herokuapp.com/quotes/random',
    'https://programming-quotes-api.herokuapp.com/quotes/random',
  ];

  const promises = apis.map((api) => fetch(api));
  return Promise.all(promises)
    .then((resp) => Promise.all(resp.map((element) => element.json())))
    .then((resp) => resp.map((element) => services(element)))
    .then((resp) => res.send(resp))
    .catch((error) => next(error));
});
