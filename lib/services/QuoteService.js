module.exports = class QuoteService {
  static apiList = [
    'https://programming-quotes-api.herokuapp.com/quotes/random',
    'https://futuramaapi.herokuapp.com/api/quotes/1',
    'https://api.quotable.io/random',
  ];

  static parse = (data, index) => {
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
};
