const { Router } = require('express');
const fetch = require('cross-fetch');

module.exports = Router().get('/', (req, res, next) => {
  const services = (data, index) => {
    switch (index) {
      case 0: {
        const { author, en } = data;
        return { author, content: en };
      }
      case 1: {
        const { character, quote } = data[0];
        return { author: character, content: quote };
      }
      case 2: {
        const { author, content } = data;
        return { author, content };
      }
      default:
        console.log('error returning data');
        break;
    }
  };

  const apis = [
    'https://programming-quotes-api.herokuapp.com/quotes/random',
    'https://futuramaapi.herokuapp.com/api/quotes/1',
    'https://api.quotable.io/random',
  ];

  const promises = apis.map((api) => fetch(api));

  return Promise.all(promises)
    .then((resp) => Promise.all(resp.map((element) => element.json())))
    .then((resp) => resp.map((element, index) => services(element, index)))
    .then((resp) => res.send(resp))
    .catch((error) => next(error));
});
