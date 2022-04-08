const fetch = require('cross-fetch');
const { parseQuotes } = require('../utils/quotes');

module.exports = class QuoteService {
  static apiList = [
    'https://programming-quotes-api.herokuapp.com/quotes/random',
    'https://futuramaapi.herokuapp.com/api/quotes/1',
    'https://api.quotable.io/random',
  ];

  static fetchQuotes = () => {
    return Promise.all(this.apiList.map((api) => fetch(api)))
      .then((resp) => Promise.all(resp.map((data) => data.json())))
      .then((resp) => resp.map((data, index) => parseQuotes(data, index)));
  };
};
